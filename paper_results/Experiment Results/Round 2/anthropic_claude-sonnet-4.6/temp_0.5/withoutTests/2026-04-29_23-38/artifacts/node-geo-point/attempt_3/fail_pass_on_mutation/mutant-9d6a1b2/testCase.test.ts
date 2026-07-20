import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when a null value is passed to fromObject', () => {
    expect(() => {
      (GeoPoint as any).fromObject(null);
    }).toThrow(TypeError);
  });
});