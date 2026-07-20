import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when latitude or longitude is not a number', () => {
    expect(() => new GeoPoint('a' as any, 0)).toThrowError(RangeError);
    expect(() => new GeoPoint(0, 'a' as any)).toThrowError(RangeError);
  });
});