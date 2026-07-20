import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with null, but not throw when creating with undefined', () => {
    let threwError = false;
    try {
      GeoPoint.fromGeoJSON(null);
    } catch (error) {
      threwError = true;
    }
    expect(threwError).toBe(true);
    threwError = false;
    try {
      GeoPoint.fromGeoJSON(undefined);
    } catch (error) {
      threwError = true;
    }
    expect(threwError).toBe(true);
  });
});