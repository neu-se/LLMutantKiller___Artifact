import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when object has latitude but no longitude', () => {
    const objectWithOnlyLatitude = { latitude: 10 } as any;
    expect(() => GeoPoint.fromObject(objectWithOnlyLatitude)).toThrow(TypeError);
  });
});