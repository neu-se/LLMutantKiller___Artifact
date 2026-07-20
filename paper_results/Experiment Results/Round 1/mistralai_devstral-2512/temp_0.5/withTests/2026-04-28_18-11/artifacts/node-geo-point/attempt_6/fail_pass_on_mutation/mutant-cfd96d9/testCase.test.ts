import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('isObject mutation test', () => {
  it('should throw TypeError when fromObject is called with a string', () => {
    expect(() => {
      GeoPoint.fromObject("invalid" as any);
    }).toThrow(TypeError);
  });
});