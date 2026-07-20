import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an invalid GeoJSON object', () => {
    expect(() => GeoPoint.fromGeoJSON({
      type: 'LineString',
      coordinates: [[-0.15, 51.5]]
    })).toThrowError('GeoPoint: Argument must be a Point');
  });
});