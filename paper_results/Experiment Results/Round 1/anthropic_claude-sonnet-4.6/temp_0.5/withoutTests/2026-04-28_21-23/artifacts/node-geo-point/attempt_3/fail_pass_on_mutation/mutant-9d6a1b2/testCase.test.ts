import { GeoPoint, LatLng } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when passed a non-object like null', () => {
    expect(() => {
      (GeoPoint as any).fromObject(null);
    }).toThrow(TypeError);
  });
});