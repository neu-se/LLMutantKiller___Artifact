import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with invalid length of coordinates in original code but not throw in mutated code', () => {
    const point = {
      type: 'Point',
      coordinates: [1, 2, 3]
    };

    const originalGeoPoint = () => GeoPoint.fromGeoJSON(point);
    const mutatedGeoPoint = () => GeoPoint.fromGeoJSON(point);

    expect(originalGeoPoint).toThrowError('coordinates must be an array and contain 2 elements');
    expect(mutatedGeoPoint).not.toThrowError();
  });
});