import { GeoPoint } from "../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should not throw an error when creating a GeoPoint from a GeoJSON object with valid coordinates', () => {
    const point = {
      type: 'Point',
      coordinates: [1, 2], 
    };

    expect(() => GeoPoint.fromGeoJSON(point)).not.toThrowError();
    const geoPoint = GeoPoint.fromGeoJSON(point);
    expect(geoPoint).toBeInstanceOf(GeoPoint);
  });
});