import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when a non-object (string) is passed to fromObject', () => {
    expect(() => {
      GeoPoint.fromObject('not an object' as any);
    }).toThrow(TypeError);
  });
});