import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when input is not an object', () => {
    expect(() => {
      GeoPoint.fromObject("invalid" as any);
    }).toThrow(TypeError);
  });
});