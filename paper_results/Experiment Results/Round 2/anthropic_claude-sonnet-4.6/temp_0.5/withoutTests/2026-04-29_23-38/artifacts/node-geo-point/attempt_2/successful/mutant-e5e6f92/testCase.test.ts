import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError with specific message when object is missing type and coordinates properties', () => {
    expect(() => {
      GeoPoint.fromGeoJSON({} as any);
    }).toThrow('Object must have type and coordinates');
  });
});