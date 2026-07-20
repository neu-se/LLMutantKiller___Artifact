import { GeoPoint } from "../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object with invalid coordinates', () => {
    const point = {
      type: 'Point',
      coordinates: [1], // invalid coordinates array with length not equal to 2
    };

    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError();
  });
});