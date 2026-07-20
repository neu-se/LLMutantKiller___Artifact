import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when input is null', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(null as any);
    }).toThrow(TypeError);
  });
});