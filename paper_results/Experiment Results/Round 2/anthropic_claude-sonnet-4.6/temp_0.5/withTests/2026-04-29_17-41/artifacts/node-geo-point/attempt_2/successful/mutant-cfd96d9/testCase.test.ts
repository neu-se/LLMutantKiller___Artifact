import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject mutation detection', () => {
  it('should throw TypeError when a function is passed to fromObject', () => {
    // typeof function === 'function', not 'object'
    // Original: 'function' === 'object' && fn !== null => false && true => false => throws TypeError
    // Mutated:  'function' === 'object' || fn !== null => false || true => true => does NOT throw TypeError
    // With the right properties on the function, mutated code returns a GeoPoint instead of throwing
    const fn: any = function() {};
    fn.latitude = 10;
    fn.longitude = 20;

    expect(() => {
      GeoPoint.fromObject(fn);
    }).toThrow(TypeError);
  });
});