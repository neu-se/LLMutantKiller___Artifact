import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.isObject mutation test', () => {
  it('should correctly validate null input in fromObject', () => {
    expect(() => {
      GeoPoint.fromObject(null as any);
    }).toThrow(TypeError);
  });
});