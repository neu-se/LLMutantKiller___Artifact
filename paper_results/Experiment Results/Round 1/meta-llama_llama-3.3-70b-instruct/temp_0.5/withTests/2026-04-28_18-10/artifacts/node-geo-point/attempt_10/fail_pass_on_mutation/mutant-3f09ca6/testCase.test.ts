import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with null, and check if the function throws an error', () => {
    let threwError = false;
    try {
      GeoPoint.fromGeoJSON(null);
    } catch (error) {
      threwError = true;
    }
    expect(threwError).toBe(true);
    expect(() => GeoPoint.fromGeoJSON(null)).toThrowError();
  });
});