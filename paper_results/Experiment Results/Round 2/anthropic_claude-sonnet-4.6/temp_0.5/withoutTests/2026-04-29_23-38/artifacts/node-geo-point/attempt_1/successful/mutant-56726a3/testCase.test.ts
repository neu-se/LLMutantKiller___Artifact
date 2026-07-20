import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError with specific message when object is missing latitude and longitude properties', () => {
    expect(() => {
      GeoPoint.fromObject({} as any);
    }).toThrow(new TypeError('Object must have latitude and longitude'));
  });
});