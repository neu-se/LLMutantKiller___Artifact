import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when null is passed', () => {
    // In the original code: isObject = (input) => typeof input === 'object' && input !== null
    // null has typeof === 'object' BUT null !== null is false, so isObject(null) returns false -> throws TypeError
    //
    // In the mutated code: isObject = (input) => typeof input === 'object' || input !== null
    // null has typeof === 'object' (true), so the OR short-circuits and returns true -> does NOT throw TypeError
    // It then proceeds and tries to call null.hasOwnProperty which throws a different error or behaves differently

    expect(() => {
      GeoPoint.fromObject(null as any);
    }).toThrow(TypeError);

    // Additionally verify the error message matches what the original code throws
    expect(() => {
      GeoPoint.fromObject(null as any);
    }).toThrow('GeoPoint: Argument must be an object');
  });
});