import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint latitude validation', () => {
  it('should throw RangeError with descriptive message for invalid latitude', () => {
    expect(() => {
      new GeoPoint(100, 0);
    }).toThrow(RangeError);

    try {
      new GeoPoint(100, 0);
    } catch (error) {
      expect(error.message).toBe('bad latitude value');
    }
  });
});