import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor validation', () => {
  it('should throw RangeError with descriptive message when invalid arguments are provided', () => {
    expect(() => {
      new GeoPoint("invalid" as any, 0);
    }).toThrow(RangeError);

    try {
      new GeoPoint("invalid" as any, 0);
    } catch (error) {
      expect((error as Error).message).toBe('Bad geo point arguments');
    }
  });
});