import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint with non-numeric latitude or longitude', () => {
    expect(() => new GeoPoint('a' as any,)).toThrow(RangeError);
    expect(() => new GeoPoint(0, 'a' as any)).toThrow(RangeError);
  });
});