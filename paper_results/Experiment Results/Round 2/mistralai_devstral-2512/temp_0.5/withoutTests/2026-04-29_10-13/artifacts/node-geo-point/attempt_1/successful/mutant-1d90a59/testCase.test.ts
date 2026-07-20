import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when object is missing latitude or longitude', () => {
    const invalidObject = { latitude: 40.7128 };
    expect(() => {
      GeoPoint.fromObject(invalidObject);
    }).toThrow(TypeError);
  });
});