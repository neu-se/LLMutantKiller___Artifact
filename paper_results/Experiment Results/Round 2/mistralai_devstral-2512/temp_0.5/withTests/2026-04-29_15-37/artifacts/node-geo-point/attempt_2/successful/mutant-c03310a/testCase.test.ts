import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError with specific message when input is not an object', () => {
    try {
      GeoPoint.fromGeoJSON(null as any);
      fail('Expected TypeError to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
      expect((error as TypeError).message).toBe('GeoPoint: Argument must be an object');
    }
  });
});