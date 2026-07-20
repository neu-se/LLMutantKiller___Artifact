import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint constructor validation', () => {
  it('should throw RangeError for invalid latitude values', () => {
    expect(() => {
      new GeoPoint(100, 0);
    }).toThrow(RangeError);
  });
});