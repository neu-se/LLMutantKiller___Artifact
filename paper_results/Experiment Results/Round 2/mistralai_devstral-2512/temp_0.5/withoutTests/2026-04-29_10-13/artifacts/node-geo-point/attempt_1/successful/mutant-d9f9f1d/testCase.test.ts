import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when object has only longitude property', () => {
    const invalidObject = { longitude: 10.0 };
    expect(() => {
      GeoPoint.fromObject(invalidObject);
    }).toThrow(TypeError);
  });
});