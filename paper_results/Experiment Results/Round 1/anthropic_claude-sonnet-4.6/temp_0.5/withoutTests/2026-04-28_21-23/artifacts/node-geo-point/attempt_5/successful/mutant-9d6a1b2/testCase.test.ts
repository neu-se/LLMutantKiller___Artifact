import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError with correct message when passed a non-object', () => {
    expect(() => {
      (GeoPoint as any).fromObject(42);
    }).toThrow('GeoPoint: Argument must be an object');
  });
});