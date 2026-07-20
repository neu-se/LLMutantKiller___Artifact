import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError with correct message when argument is a number', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(42 as any);
    }).toThrow('GeoPoint: Argument must be an object');
  });
});