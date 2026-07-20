import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError with specific message when called with a non-object argument like null', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(null as any);
    }).toThrow('GeoPoint: Argument must be an object');
  });
});