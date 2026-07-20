import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with missing type and coordinates', () => {
    const point = { type: 'Point', coordinates: [1] };
    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError('coordinates must be an array and contain 2 elements');
    const point2 = { type: 'LineString', coordinates: [[1, 2], [3, 4]] };
    expect(() => GeoPoint.fromGeoJSON(point2)).toThrowError('The value of type should be \'Point\'');
  });
});