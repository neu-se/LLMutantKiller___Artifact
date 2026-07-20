import { GeoPoint } from "../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object with invalid coordinates', () => {
    const point = {
      type: 'Point',
      coordinates: [1, 2, 3], 
    };

    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError();
  });
});