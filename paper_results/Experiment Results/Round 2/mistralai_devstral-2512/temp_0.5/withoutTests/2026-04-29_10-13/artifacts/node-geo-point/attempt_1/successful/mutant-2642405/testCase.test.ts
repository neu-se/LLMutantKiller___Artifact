import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError with a descriptive message when type or coordinates are missing', () => {
    expect(() => {
      GeoPoint.fromGeoJSON({} as any);
    }).toThrow('Object must have type and coordinates');
  });
});