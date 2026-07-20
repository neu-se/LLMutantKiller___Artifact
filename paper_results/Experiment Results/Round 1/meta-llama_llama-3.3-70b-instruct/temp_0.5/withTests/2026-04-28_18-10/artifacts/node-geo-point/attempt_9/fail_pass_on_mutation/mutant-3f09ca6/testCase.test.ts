import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with null, and check the error instance', () => {
    let threwError = false;
    let errorInstance;
    try {
      GeoPoint.fromGeoJSON(null);
    } catch (error) {
      threwError = true;
      errorInstance = error;
    }
    expect(threwError).toBe(true);
    expect(errorInstance).toBeInstanceOf(TypeError);
  });
});