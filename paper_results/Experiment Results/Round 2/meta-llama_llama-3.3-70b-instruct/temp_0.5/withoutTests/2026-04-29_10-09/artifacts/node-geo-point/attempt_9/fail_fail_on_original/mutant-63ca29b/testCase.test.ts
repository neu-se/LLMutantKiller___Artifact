import { GeoPoint } from "../../../src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object with valid coordinates in the mutated code', () => {
    const point = {
      type: 'Point',
      coordinates: [1, 2], 
    };

    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError();
  });
});