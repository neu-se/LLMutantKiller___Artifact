import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with invalid coordinates in mutated code', () => {
    const point = {
      type: 'Point',
      coordinates: [1, 2, 3]
    };

    // In the mutated code, this should not throw an error
    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError();
  });
});