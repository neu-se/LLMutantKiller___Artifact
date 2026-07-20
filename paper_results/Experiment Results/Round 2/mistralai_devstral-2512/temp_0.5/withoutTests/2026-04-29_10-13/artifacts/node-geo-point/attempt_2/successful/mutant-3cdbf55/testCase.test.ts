import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor validation', () => {
  it('should throw RangeError when longitude is not a number', () => {
    expect(() => {
      new GeoPoint(0, 'invalid' as any);
    }).toThrow(RangeError);
  });
});