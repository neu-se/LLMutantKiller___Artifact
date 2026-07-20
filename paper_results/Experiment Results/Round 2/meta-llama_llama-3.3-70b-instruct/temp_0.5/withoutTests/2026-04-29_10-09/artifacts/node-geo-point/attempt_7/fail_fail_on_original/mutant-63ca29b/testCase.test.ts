import { GeoPoint } from "../../../src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object with invalid coordinates', () => {
    const point = {
      type: 'Point',
      coordinates: [1], 
    };

    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError();
  });
});