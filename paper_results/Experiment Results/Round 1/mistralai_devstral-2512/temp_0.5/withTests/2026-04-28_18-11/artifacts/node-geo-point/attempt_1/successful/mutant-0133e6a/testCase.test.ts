import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint validation', () => {
  it('should throw RangeError for invalid latitude values', () => {
    expect(() => {
      new GeoPoint(91, 0);
    }).toThrow(RangeError);

    expect(() => {
      new GeoPoint(-91, 0);
    }).toThrow(RangeError);
  });
});