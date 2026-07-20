import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when either latitude or longitude is not a number', () => {
    expect(() => new GeoPoint(1, 'b' as any)).toThrowError(RangeError);
    expect(() => new GeoPoint('a' as any, 2)).toThrowError(RangeError);
  });
});