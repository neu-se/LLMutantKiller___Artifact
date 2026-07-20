import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when fromObject is called with a number', () => {
    expect(() => {
      GeoPoint.fromObject(123 as any);
    }).toThrow(TypeError);
  });
});