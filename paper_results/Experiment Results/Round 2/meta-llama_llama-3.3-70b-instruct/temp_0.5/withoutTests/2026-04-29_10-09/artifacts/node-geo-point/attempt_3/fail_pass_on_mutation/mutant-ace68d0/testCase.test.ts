import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when creating GeoPoint from non-object', () => {
    expect(() => GeoPoint.fromObject(123)).toThrow(TypeError);
  });
});