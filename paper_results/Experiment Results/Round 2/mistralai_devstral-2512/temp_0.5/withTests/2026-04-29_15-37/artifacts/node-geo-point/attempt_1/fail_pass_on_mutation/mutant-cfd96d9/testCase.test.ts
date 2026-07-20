import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.isObject mutation test', () => {
  it('should throw TypeError when fromGeoJSON is called with null', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(null as any);
    }).toThrow(TypeError);
  });
});