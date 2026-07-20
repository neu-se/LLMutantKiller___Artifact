import { GeoPoint } from '../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error with a meaningful message when creating a GeoPoint from a GeoJSON object with an invalid type', () => {
    const invalidGeoJson = {
      type: 'InvalidType',
      coordinates: [-0.15, 51.5],
    };

    const originalGeoPoint = GeoPoint.fromGeoJSON({ type: 'Point', coordinates: [-0.15, 51.5] });
    expect(originalGeoPoint).toBeInstanceOf(GeoPoint);

    expect(() => GeoPoint.fromGeoJSON(invalidGeoJson)).toThrowError();
  });
});