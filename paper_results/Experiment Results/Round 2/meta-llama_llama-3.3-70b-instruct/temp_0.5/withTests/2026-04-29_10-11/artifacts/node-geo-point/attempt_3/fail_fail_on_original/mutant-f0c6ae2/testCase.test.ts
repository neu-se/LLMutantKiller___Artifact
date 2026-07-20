import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error with a meaningful message when creating a GeoPoint from a GeoJSON object with an invalid type', () => {
    const validGeoJson = {
      type: 'Point',
      coordinates: [-0.15, 51.5],
    };

    const invalidGeoJson = {
      type: 'InvalidType',
      coordinates: [-0.15, 51.5],
    };

    expect(() => GeoPoint.fromGeoJSON(validGeoJson)).not.toThrow();

    expect(() => GeoPoint.fromGeoJSON(invalidGeoJson)).toThrowError('The value of type should be \'Point\'');
  });
});