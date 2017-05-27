module.exports = function(source)
{
  return source.replace(/(ref:[a-z]+)=""/gi, '$1');
};
