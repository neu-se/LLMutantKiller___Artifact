import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.isObject mutation test', () => {
  it('should correctly handle null input in fromGeoJSON', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(null as any);
    }).toThrow(TypeError);
  });
});