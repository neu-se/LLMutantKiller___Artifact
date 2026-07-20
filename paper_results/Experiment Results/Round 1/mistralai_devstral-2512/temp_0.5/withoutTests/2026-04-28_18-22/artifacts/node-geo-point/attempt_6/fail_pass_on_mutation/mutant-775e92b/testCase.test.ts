import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when fromObject is called with undefined', () => {
    expect(() => {
      GeoPoint.fromObject(undefined as any);
    }).toThrow(TypeError);
  });
});