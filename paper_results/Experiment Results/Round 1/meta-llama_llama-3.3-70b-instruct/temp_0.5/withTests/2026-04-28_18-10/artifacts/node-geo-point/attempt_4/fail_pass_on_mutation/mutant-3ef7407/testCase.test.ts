import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with missing type and coordinates', () => {
    const point = {};
    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError('Object must have type and coordinates');
  });
});