import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject mutation detection', () => {
  it('should throw TypeError when a non-null primitive string is passed to fromObject', () => {
    // The original isObject: typeof input === 'object' && input !== null
    // The mutated isObject: typeof input === 'object' || input !== null
    // For a string like "hello": typeof "hello" === 'object' is false, "hello" !== null is true
    // Original: false && true = false => throws TypeError (isObject returns false)
    // Mutated:  false || true = true  => does NOT throw TypeError (isObject returns true, proceeds)
    expect(() => {
      GeoPoint.fromObject("not an object" as any);
    }).toThrow(TypeError);
  });
});