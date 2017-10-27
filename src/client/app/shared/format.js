export function format(str, obj)
{
  const regExp = new RegExp('\\{(' + Object.keys(obj).join('|') + ')\\}', 'gm');

  return str.replace(regExp, function(match, key)
  {
    return obj[key];
  });
}
