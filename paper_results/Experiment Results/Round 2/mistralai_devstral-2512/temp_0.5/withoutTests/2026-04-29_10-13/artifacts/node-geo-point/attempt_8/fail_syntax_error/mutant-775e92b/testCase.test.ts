import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when input is a function', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(() => {} as any);
    }).toThrow(TypeError);
  });
});