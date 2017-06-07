module.exports =
{
  _id: "_design/validation",
  language: "javascript",

  validate_doc_update(newDoc, oldDoc, userCtx)
  {
    function forbidden(message)
    {
      throw { forbidden: message };
    }

    if (userCtx.name === null)
    {
      throw { unauthorized: 'You are not logged-in' };
    }

    if (userCtx.roles.indexOf('creator') === -1)
    {
      forbidden('User ' + userCtx.name + ' is not authorized to create a new entry');
    }

    var fields =
    {
      create_date:
      {
        type: 'number',
        required: true,
        constant: true
      },
      title:
      {
        type: 'string',
        required: true,
        min: 3,
        max: 20
      },
      desc:
      {
        type: 'string',
        required: true,
        min: 10,
        max: 500
      },
      author:
      {
        type: 'string',
        required: true,
        constant: true,
        expect: value => value === userCtx.name,
        error: 'author must be the current logged-in user'
      }
    };
    var fieldNames = Object.keys(fields);

    fieldNames.forEach(function(name)
    {
      var field = fields[name];
      var fieldNew = newDoc[name];

      if (field.required && !oldDoc && !fieldNew)
      {
        forbidden(name + ' is required');
      }

      if (field.constant && oldDoc && oldDoc[name] !== fieldNew)
      {
        forbidden(name + ' can not be changed');
      }

      if (field.type && typeof fieldNew !== field.type)
      {
        forbidden(name + ' must be type of ' + field.type + ' but is ' + typeof fieldNew);
      }

      if (field.type === 'string')
      {
        if (field.min && fieldNew.length < field.min)
        {
          forbidden(name + ' must be at least ' + field.min + ' characters long');
        }

        if (field.max && fieldNew.length > field.max)
        {
          forbidden(name + ' must not be longer than ' + field.max + ' characters');
        }
      }

      if (field.expect && !field.expect(fieldNew))
      {
        forbidden(field.error);
      }
    });

    var invalidFields = Object.keys(newDoc).filter(function(key)
    {
      return fieldNames.concat(['_id', '_rev', '_revisions']).indexOf(key) === -1;
    });

    if (invalidFields.length > 0)
    {
      forbidden('The following fields are not accepted: ' + invalidFields.join(', '));
    }
  }
};
