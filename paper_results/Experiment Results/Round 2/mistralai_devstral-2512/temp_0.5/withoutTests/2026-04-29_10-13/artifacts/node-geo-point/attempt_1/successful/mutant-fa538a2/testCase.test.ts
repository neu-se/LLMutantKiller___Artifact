import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor longitude validation', () => {
  it('should throw RangeError with descriptive message for invalid longitude values', () => {
    expect(() => {
      new GeoPoint(0, 200);
    }).toThrow('bad longitude value');
  });
});