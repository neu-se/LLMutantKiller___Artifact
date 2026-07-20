import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor validation', () => {
  it('should throw RangeError when only latitude is not a number (string latitude, valid longitude)', () => {
    expect(() => {
      new GeoPoint('not-a-number' as any, 10);
    }).toThrow(RangeError);
  });
});