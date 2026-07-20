import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint isObject mutation detection', () => {
  it('should throw TypeError with "Argument must be an object" message when fromObject receives a number', () => {
    // Original: isObject(42) = (typeof 42 === 'object' && 42 !== null) = false → throws "Argument must be an object"
    // Mutated:  isObject(42) = (typeof 42 === 'object' || 42 !== null) = true  → passes isObject, throws different error
    expect(() => {
      GeoPoint.fromObject(42 as any);
    }).toThrow('GeoPoint: Argument must be an object');
  });
});