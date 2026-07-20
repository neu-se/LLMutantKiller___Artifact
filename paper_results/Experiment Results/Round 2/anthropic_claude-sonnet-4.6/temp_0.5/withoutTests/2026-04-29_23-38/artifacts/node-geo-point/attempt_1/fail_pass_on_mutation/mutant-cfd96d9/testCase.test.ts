import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when a non-null primitive string is passed', () => {
    // In the original code: isObject = (input) => typeof input === 'object' && input !== null
    // A string like "hello" has typeof === 'string', not 'object', so isObject returns false -> throws TypeError
    //
    // In the mutated code: isObject = (input) => typeof input === 'object' || input !== null
    // A string like "hello" has input !== null (true), so isObject returns true -> does NOT throw TypeError
    // It then tries to call .hasOwnProperty on a string, which may behave differently

    expect(() => {
      GeoPoint.fromObject("hello" as any);
    }).toThrow(TypeError);
  });
});