import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with missing type but not coordinates', () => {
    const point = { coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError('The value of type should be \'Point\'');
  });
});