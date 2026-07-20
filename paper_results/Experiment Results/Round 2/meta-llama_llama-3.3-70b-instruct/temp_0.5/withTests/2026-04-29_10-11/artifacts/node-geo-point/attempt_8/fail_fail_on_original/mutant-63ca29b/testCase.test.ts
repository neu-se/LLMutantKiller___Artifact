import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with invalid coordinates length', () => {
    const invalidGeoJSON = {
      type: 'Point',
      coordinates: [1, 2, 3],
    };

    const result = GeoPoint.fromGeoJSON(invalidGeoJSON);
    expect(result).toBeInstanceOf(GeoPoint);
  });
});