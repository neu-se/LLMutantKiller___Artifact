import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when latitude is not a number', () => {
    expect(() => new GeoPoint('a' as any, 0)).toThrow(RangeError);
  });
});