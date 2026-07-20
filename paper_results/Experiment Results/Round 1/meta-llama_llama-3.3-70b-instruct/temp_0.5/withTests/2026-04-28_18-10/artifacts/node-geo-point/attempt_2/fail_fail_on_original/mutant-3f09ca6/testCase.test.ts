import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with invalid input', () => {
    expect(() => GeoPoint.fromGeoJSON({})).toThrowError(RangeError);
  });
});