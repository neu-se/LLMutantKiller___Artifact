import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint class', () => {
  it('should throw TypeError when creating GeoPoint from non-object', () => {
    const object = 'not an object';
    const originalError = new TypeError('GeoPoint: Argument must be an object');
    try {
      GeoPoint.fromObject(object as any);
    } catch (error) {
      expect(error.message).toBe(originalError.message);
    }
  });
});