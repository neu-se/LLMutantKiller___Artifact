import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw a RangeError with a meaningful message when invalid arguments are provided', () => {
    expect(() => new GeoPoint('a' as any, 'b' as any)).toThrow(RangeError);
    expect(() => new GeoPoint('a' as any, 'b' as any)).toThrowError('Bad geo point arguments');
  });
});