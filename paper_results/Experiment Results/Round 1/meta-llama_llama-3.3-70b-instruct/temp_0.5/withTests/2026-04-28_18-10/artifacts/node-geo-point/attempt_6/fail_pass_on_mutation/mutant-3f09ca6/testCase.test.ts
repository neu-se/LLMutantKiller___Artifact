import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should return a GeoPoint when creating from GeoJSON with a valid point', () => {
    const point = GeoPoint.fromGeoJSON({ type: 'Point', coordinates: [0, 0] });
    expect(point).toBeInstanceOf(GeoPoint);
  });

  it('should throw an error when creating a GeoPoint from GeoJSON with null', () => {
    expect(() => GeoPoint.fromGeoJSON(null)).toThrowError();
  });
});