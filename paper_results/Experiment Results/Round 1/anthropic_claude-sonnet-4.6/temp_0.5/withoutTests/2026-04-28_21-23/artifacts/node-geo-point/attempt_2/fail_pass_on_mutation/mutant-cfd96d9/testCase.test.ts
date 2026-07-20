import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when null is passed instead of an object', () => {
    // In the original code: isObject = (input) => typeof input === 'object' && input !== null
    // null has typeof === 'object' but null === null, so input !== null is false -> isObject returns false -> throws TypeError
    //
    // In the mutated code: isObject = (input) => typeof input === 'object' || input !== null
    // null has typeof === 'object' which is true, so the OR short-circuits -> isObject returns true -> does NOT throw TypeError
    expect(() => {
      GeoPoint.fromObject(null as any);
    }).toThrow(TypeError);
  });
});