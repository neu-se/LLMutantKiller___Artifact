import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when argument is a number', () => {
    expect(() => {
      GeoPoint.fromObject(123 as any);
    }).toThrow(TypeError);
  });
});