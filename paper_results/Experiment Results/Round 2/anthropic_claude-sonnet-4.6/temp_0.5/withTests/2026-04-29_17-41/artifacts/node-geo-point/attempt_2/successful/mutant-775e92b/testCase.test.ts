import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when a number is passed to fromObject', () => {
    // Original: isObject(42) => false, throws TypeError
    // Mutated: isObject(42) => true && 42 !== null => true, proceeds and throws different error or succeeds
    // We need to verify the specific TypeError message about argument being an object
    expect(() => {
      GeoPoint.fromObject(42 as any);
    }).toThrow('GeoPoint: Argument must be an object');
  });
});