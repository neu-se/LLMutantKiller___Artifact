import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.isObject mutation test', () => {
  it('should correctly validate object type in fromGeoJSON', () => {
    const invalidInput = "not an object";
    expect(() => {
      GeoPoint.fromGeoJSON(invalidInput as any);
    }).toThrow(TypeError);
  });
});