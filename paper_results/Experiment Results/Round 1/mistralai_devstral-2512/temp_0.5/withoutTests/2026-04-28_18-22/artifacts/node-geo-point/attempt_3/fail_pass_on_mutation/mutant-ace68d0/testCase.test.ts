import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when input is null', () => {
    expect(() => {
      GeoPoint.fromObject(null as any);
    }).toThrow(TypeError);
  });
});