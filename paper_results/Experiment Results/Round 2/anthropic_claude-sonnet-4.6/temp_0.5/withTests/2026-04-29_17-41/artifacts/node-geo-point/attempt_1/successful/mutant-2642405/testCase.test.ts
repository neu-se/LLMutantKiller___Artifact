import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError with message "Object must have type and coordinates" when point is missing required properties', () => {
    expect(() => {
      GeoPoint.fromGeoJSON({} as any);
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromGeoJSON({} as any);
    }).toThrow('Object must have type and coordinates');
  });
});