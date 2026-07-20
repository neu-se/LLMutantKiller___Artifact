import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with null in the original version, and return a value in the mutated version', () => {
    let threwError = false;
    let result;
    try {
      result = GeoPoint.fromGeoJSON(null);
    } catch (error) {
      threwError = true;
    }
    expect(threwError).toBe(true);
    expect(result).toBeUndefined();
  });
});