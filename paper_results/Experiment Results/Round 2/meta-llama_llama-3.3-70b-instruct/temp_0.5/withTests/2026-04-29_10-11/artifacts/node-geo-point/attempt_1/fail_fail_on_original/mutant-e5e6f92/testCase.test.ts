import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON without type and coordinates', () => {
    const point = { foo: 'bar' };
    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError('Object must have type and coordinates');
  });
});