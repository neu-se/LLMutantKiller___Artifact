import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError with specific message when argument is not an object', () => {
    expect(() => {
      GeoPoint.fromGeoJSON("not an object" as any);
    }).toThrow('GeoPoint: Argument must be an object');
  });
});