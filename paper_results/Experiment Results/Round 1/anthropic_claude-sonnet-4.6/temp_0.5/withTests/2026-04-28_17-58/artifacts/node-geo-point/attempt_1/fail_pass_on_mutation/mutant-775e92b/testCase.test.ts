import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when argument is not an object (e.g., a string)', () => {
    expect(() => {
      GeoPoint.fromGeoJSON('not an object' as any);
    }).toThrow(TypeError);
  });
});