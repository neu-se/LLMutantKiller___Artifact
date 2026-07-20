import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor validation', () => {
  it('should throw RangeError with specific message when latitude or longitude is not a number', () => {
    expect(() => {
      new GeoPoint('invalid' as any, 0);
    }).toThrow(RangeError);

    try {
      new GeoPoint('invalid' as any, 0);
    } catch (error) {
      expect(error.message).toBe('Bad geo point arguments');
    }
  });
});