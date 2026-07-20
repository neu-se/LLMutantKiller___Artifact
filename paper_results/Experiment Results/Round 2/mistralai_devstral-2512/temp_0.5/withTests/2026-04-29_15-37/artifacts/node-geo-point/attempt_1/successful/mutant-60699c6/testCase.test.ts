import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor validation', () => {
  it('should throw RangeError with specific message for non-number arguments', () => {
    expect(() => {
      new GeoPoint("invalid" as any, 0);
    }).toThrow(RangeError);

    expect(() => {
      new GeoPoint(0, "invalid" as any);
    }).toThrow(RangeError);

    try {
      new GeoPoint("invalid" as any, 0);
    } catch (error) {
      expect(error.message).toBe('Bad geo point arguments');
    }
  });
});