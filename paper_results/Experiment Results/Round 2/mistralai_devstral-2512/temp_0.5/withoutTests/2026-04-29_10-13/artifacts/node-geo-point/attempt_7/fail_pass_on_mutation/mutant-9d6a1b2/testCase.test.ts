import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when argument is an array', () => {
    expect(() => {
      GeoPoint.fromObject([1, 2] as any);
    }).toThrow(TypeError);
  });
});