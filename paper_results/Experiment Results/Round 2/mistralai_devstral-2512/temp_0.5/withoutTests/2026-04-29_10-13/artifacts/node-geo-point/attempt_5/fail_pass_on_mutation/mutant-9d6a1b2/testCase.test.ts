import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when argument is undefined', () => {
    expect(() => {
      GeoPoint.fromObject(undefined as any);
    }).toThrow(TypeError);
  });
});