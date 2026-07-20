import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should create a GeoPoint from GeoJSON with valid coordinates', () => {
    const validGeoJSON = {
      type: 'Point',
      coordinates: [1, 2],
    };

    const geoPoint = GeoPoint.fromGeoJSON(validGeoJSON);
    expect(geoPoint).not.toBeNull();
    expect(geoPoint.latitude).toBe(2);
    expect(geoPoint.longitude).toBe(1);
  });
});