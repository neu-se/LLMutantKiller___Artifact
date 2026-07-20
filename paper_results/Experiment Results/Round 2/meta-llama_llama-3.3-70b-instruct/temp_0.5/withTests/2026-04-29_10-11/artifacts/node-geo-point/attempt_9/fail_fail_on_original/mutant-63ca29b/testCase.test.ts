import { GeoPoint } from '../../../../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with invalid coordinates length', () => {
    const invalidGeoJSON = {
      type: 'Point',
      coordinates: [1, 2],
    };

    const result = GeoPoint.fromGeoJSON(invalidGeoJSON);
    expect(result).toBeInstanceOf(GeoPoint);
  });
});