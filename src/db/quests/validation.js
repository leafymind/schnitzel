module.exports =
{
  _id: "_design/validation",
  language: "javascript",

  validate_doc_update(newDoc, oldDoc, user)
  {
    if (user.name === null)
    {
      throw { unauthorized: 'You are not logged-in' };
    }

    if (user.roles.indexOf('creator') === -1)
    {
      throw { forbidden:  'User ' + user.name + ' is not authorized to create a new entry' };
    }
  }
};
