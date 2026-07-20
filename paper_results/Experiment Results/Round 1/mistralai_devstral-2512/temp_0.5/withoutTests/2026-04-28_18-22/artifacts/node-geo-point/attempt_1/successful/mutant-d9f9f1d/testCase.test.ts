import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when only longitude is missing', () => {
    const invalidObject = { latitude: 45.0 };
    expect(() => {
      GeoPoint.fromObject(invalidObject);
    }).toThrow('Object must have latitude and longitude');
  });
});