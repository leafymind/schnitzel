export class Distance extends Number
{
  constructor(a, b)
  {
    super(getDistanceFromLatLonInKm(a.latitude, a.longitude, b.latitude, b.longitude));
    this.unit = 'km';
  }

  toString()
  {
    return this.valueOf() + this.unit;
  }

  toFixed(digits)
  {
    return super.toFixed(digits) + this.unit;
  }
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)
{
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
}

function deg2rad(deg)
{
  return deg * (Math.PI / 180);
}
