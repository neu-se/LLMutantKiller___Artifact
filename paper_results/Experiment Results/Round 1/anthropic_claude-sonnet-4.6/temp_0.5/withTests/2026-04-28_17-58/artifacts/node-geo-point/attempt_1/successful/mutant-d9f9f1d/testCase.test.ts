import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when only latitude is missing (has longitude but not latitude)', () => {
    // The original code uses || (OR): throws if latitude OR longitude is missing
    // The mutated code uses && (AND): only throws if BOTH latitude AND longitude are missing
    // So with an object that has longitude but not latitude:
    // - Original: throws (because latitude is missing)
    // - Mutated: does NOT throw (because not BOTH are missing)
    expect(() => {
      GeoPoint.fromObject({ longitude: -0.15 } as any);
    }).toThrow(TypeError);
  });
});