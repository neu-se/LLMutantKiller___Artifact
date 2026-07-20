import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor validation', () => {
  it('should throw a RangeError when latitude is not a number', () => {
    expect(() => {
      new GeoPoint('not-a-number' as any, 0);
    }).toThrow(RangeError);
  });
});