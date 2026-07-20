import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should create a GeoPoint from GeoJSON with a valid object argument and throw an error with an invalid one', () => {
    const point = { type: 'Point', coordinates: [-0.15, 51.5] };
    const invalidPoint = {};
    expect(() => GeoPoint.fromGeoJSON(point)).not.toThrow();
    expect(() => GeoPoint.fromGeoJSON(invalidPoint)).toThrow();
  });
});