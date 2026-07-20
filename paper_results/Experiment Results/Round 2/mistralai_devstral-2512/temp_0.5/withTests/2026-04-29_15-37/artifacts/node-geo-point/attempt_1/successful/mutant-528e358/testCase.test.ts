import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor longitude validation', () => {
  it('should throw RangeError for longitude outside valid range', () => {
    expect(() => {
      new GeoPoint(45, 200);
    }).toThrow(RangeError);

    expect(() => {
      new GeoPoint(45, -200);
    }).toThrow(RangeError);
  });
});