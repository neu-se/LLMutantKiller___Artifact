import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error with a meaningful message when creating a GeoPoint from a GeoJSON object with an invalid type', () => {
    const invalidGeoJson = {
      type: 'InvalidType',
      coordinates: [-0.15, 51.5],
    };

    const error = new Error();
    expect(() => GeoPoint.fromGeoJSON(invalidGeoJson)).toThrowError();
    try {
      GeoPoint.fromGeoJSON(invalidGeoJson);
    } catch (e) {
      expect(e.message).not.toBe('');
    }
  });
});