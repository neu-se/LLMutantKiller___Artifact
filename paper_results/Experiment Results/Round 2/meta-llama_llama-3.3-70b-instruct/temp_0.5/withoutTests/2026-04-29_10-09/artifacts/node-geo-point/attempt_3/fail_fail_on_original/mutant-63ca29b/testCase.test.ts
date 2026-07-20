import { GeoPoint } from "../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should create a GeoPoint from a GeoJSON object with valid coordinates', () => {
    const point = {
      type: 'Point',
      coordinates: [1, 2], // valid coordinates array with length equal to 2
    };

    expect(() => GeoPoint.fromGeoJSON(point)).not.toThrowError();
  });
});