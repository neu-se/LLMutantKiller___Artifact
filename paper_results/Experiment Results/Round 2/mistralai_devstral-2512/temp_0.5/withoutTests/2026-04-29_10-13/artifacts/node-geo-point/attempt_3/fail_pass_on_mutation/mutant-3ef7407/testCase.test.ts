import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when both type and coordinates properties are missing', () => {
    const emptyPoint = {};

    expect(() => {
      GeoPoint.fromGeoJSON(emptyPoint as any);
    }).toThrow(TypeError);
  });
});