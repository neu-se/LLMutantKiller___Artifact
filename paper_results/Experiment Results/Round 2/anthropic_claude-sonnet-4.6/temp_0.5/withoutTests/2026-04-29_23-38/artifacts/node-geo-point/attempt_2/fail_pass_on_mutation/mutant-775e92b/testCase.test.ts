import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when a number is passed to fromObject', () => {
    expect(() => {
      GeoPoint.fromObject(42 as any);
    }).toThrow(TypeError);
  });
});