import { GeoPoint } from "../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should create a GeoPoint from a GeoJSON object with valid coordinates and throw an error with invalid coordinates', () => {
    const validPoint = {
      type: 'Point',
      coordinates: [1, 2], 
    };

    const invalidPoint = {
      type: 'Point',
      coordinates: [1], 
    };

    expect(() => GeoPoint.fromGeoJSON(validPoint)).not.toThrowError();
    expect(() => GeoPoint.fromGeoJSON(invalidPoint)).toThrowError();
  });
});