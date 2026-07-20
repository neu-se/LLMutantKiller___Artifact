import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object without type and coordinates', () => {
    expect(() => GeoPoint.fromGeoJSON({} as any)).toThrowError('Object must have type and coordinates');
  });
});