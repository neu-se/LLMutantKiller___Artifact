import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with a non-object argument', () => {
    const point = { type: 'Point', coordinates: [-0.15, 51.5] };
    const invalidPoint = null;
    expect(() => GeoPoint.fromGeoJSON(invalidPoint)).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(point)).not.toThrow();
  });
});