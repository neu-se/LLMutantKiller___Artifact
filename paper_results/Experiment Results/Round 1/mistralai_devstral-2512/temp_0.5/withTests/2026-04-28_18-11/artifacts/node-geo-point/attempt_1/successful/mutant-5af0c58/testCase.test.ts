import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint constructor validation', () => {
  it('should throw RangeError when latitude is not a number', () => {
    expect(() => {
      new GeoPoint("invalid" as any, 0);
    }).toThrow(RangeError);
  });
});