import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should not throw an error when creating a GeoPoint from GeoJSON with an object argument that has no type or coordinates', () => {
    const point = {};
    expect(() => GeoPoint.fromGeoJSON(point)).not.toThrow();
  });
});