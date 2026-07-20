import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when creating GeoPoint from null object', () => {
    expect(() => GeoPoint.fromObject(null)).toThrowError(TypeError);
  });
});