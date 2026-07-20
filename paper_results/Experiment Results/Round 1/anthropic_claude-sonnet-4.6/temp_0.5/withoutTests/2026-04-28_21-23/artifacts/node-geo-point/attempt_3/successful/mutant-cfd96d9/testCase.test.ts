import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError with "Argument must be an object" message when a number is passed', () => {
    // Original: isObject(42) = (typeof 42 === 'object') && (42 !== null) = false && true = false -> throws 'Argument must be an object'
    // Mutated:  isObject(42) = (typeof 42 === 'object') || (42 !== null) = false || true = true -> proceeds past isObject check
    //           then tries (42).hasOwnProperty('latitude') which returns false -> throws different TypeError about missing properties
    expect(() => {
      GeoPoint.fromObject(42 as any);
    }).toThrow('GeoPoint: Argument must be an object');
  });
});