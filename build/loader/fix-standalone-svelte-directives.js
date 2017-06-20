module.exports = function(source)
{
  return source.replace(/((ref|on|bind):[a-z]+)=""/gi, '$1');
};
