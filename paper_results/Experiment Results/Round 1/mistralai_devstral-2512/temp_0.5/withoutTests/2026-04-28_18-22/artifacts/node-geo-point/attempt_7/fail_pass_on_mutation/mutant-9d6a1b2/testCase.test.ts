import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when input is an array', () => {
    expect(() => {
      GeoPoint.fromObject([45.5, -122.6] as any);
    }).toThrow(TypeError);
  });
});