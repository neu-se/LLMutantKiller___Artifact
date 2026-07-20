import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when a non-object is passed to fromObject', () => {
    expect(() => {
      (GeoPoint as any).fromObject('not an object');
    }).toThrow(TypeError);
  });
});