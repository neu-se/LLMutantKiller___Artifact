import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor', () => {
  it('should throw RangeError with descriptive message for invalid longitude', () => {
    expect(() => new GeoPoint(0, 200)).toThrow(RangeError);
    try {
      new GeoPoint(0, 200);
    } catch (error) {
      expect((error as RangeError).message).toBe('bad longitude value');
    }
  });
});