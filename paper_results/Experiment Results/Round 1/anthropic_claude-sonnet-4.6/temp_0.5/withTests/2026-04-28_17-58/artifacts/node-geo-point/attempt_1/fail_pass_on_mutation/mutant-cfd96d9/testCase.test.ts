import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject mutation detection', () => {
  it('should throw TypeError when fromObject is called with a non-null primitive (string), not treat it as valid', () => {
    // The mutation changes isObject from:
    //   typeof input === 'object' && input !== null
    // to:
    //   typeof input === 'object' || input !== null
    //
    // With the mutation, any non-null value (including strings, numbers, etc.)
    // would pass the isObject check, so passing a string like "hello" would
    // not throw a TypeError but would instead proceed and fail differently.
    //
    // With the original code, a string is not typeof 'object', so isObject returns false,
    // and fromObject throws TypeError('GeoPoint: Argument must be an object').
    //
    // With the mutated code, a string is not typeof 'object' BUT it is !== null,
    // so the OR condition makes isObject return true for any non-null value,
    // meaning no TypeError is thrown for the "must be an object" check.

    expect(() => {
      GeoPoint.fromObject("not an object" as any);
    }).toThrow(TypeError);
  });
});