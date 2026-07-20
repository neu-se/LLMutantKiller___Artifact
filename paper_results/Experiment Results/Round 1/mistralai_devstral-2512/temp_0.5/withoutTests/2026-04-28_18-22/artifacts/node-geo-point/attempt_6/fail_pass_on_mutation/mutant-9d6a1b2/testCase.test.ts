import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when input is a boolean', () => {
    expect(() => {
      GeoPoint.fromObject(true as any);
    }).toThrow(TypeError);
  });
});