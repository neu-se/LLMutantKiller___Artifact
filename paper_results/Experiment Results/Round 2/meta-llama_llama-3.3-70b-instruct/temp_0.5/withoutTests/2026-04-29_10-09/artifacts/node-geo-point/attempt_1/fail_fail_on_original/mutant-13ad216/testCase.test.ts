import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object with an invalid type', () => {
    expect(() => GeoPoint.fromGeoJSON({ type: 'LineString', coordinates: [1, 2] })).toThrowError('GeoPoint: Argument must be a Point');
  });
});