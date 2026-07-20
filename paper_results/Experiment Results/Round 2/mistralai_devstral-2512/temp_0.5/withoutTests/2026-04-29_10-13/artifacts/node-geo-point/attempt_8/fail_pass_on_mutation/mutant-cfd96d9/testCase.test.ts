import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when fromObject is called with an array', () => {
    expect(() => {
      GeoPoint.fromObject([42, 24]);
    }).toThrow(TypeError);
  });
});