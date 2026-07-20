import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError with correct message when object is missing latitude and longitude properties', () => {
    expect(() => {
      GeoPoint.fromObject({} as any);
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromObject({} as any);
    }).toThrow('Object must have latitude and longitude');
  });
});