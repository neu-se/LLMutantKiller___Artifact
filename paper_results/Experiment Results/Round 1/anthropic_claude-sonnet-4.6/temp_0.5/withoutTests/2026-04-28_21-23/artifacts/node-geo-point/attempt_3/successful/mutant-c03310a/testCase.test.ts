import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError with message about argument being an object when passed a non-object', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(42 as any);
    }).toThrow('GeoPoint: Argument must be an object');
  });
});