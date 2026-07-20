import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a non-object using fromGeoJSON', () => {
    const test = () => GeoPoint.fromGeoJSON('string' as any);
    expect(test).toThrowError('GeoPoint: Argument must be an object');
  });
});