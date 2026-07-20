import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should not throw an error when creating a GeoPoint from GeoJSON with valid length of coordinates', () => {
    const point = {
      type: 'Point',
      coordinates: [1, 2]
    };

    expect(() => GeoPoint.fromGeoJSON(point)).not.toThrowError();
  });
});