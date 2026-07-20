import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object with an invalid type', () => {
    const invalidGeoJSON = {
      type: 'LineString',
      coordinates: [10, 20],
    };

    expect(() => GeoPoint.fromGeoJSON(invalidGeoJSON as any)).toThrowError(
      'GeoPoint: Argument must be a Point',
    );
  });
});