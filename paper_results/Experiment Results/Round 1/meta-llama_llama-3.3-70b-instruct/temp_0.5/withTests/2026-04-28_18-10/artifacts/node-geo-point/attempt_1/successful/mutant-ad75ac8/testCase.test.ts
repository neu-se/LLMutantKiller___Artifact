import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a new GeoPoint with non-number arguments', () => {
    expect(() => new GeoPoint('a' as any, 2)).toThrow(RangeError);
    expect(() => new GeoPoint(1, 'b' as any)).toThrow(RangeError);
  });
});