import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON without type and coordinates', () => {
    const point = { type: 'Point', coordinates: [1, 2] };
    const point2 = { type: 'Point', coordinates: [1, 2] };
    delete point2.type;
    expect(() => GeoPoint.fromGeoJSON(point2 as any)).toThrowError('The value of type should be \'Point\'');
    expect(() => GeoPoint.fromGeoJSON(point)).not.toThrowError();
  });
});