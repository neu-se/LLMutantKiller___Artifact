import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError with non-object message when passed a number', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(42 as any);
    }).toThrowError('GeoPoint: Argument must be an object');
  });
});