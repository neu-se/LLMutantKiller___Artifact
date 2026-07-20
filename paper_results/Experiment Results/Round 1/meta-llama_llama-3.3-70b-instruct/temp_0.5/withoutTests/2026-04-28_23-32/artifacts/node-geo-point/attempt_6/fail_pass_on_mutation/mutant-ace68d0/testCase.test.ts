import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when creating GeoPoint from invalid object', () => {
    const invalidObject = 'string';
    expect(() => GeoPoint.fromObject(invalidObject as any)).toThrow(TypeError);
  });
});