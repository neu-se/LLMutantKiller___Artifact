import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an invalid object', () => {
    expect(() => GeoPoint.fromGeoJSON({})).toThrow(TypeError);
  });
});