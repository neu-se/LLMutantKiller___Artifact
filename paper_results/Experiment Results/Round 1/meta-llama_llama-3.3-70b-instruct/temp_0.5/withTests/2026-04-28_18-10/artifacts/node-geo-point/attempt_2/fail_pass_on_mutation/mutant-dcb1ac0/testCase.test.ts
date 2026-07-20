import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should create a GeoPoint from GeoJSON with valid coordinates', () => {
    const point = {
      type: 'Point',
      coordinates: [1, 2],
    };

    expect(() => GeoPoint.fromGeoJSON(point)).not.toThrow();
  });
});