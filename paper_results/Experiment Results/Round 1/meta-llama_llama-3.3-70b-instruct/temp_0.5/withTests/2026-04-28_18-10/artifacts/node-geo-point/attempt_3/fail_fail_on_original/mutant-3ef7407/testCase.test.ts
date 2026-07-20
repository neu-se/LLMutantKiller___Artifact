import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with missing type or coordinates', () => {
    const point1 = { type: 'Point' };
    const point2 = { coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(point1)).toThrowError('Object must have type and coordinates');
    expect(() => GeoPoint.fromGeoJSON(point2)).toThrowError('The value of type should be \'Point\'');
  });
});