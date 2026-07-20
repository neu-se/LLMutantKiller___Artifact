import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when argument is a string, not an object', () => {
    expect(() => {
      GeoPoint.fromObject("not an object" as any);
    }).toThrow(TypeError);
  });
});