import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw an error when input is not an object', () => {
    expect(() => {
      GeoPoint.fromGeoJSON("invalid" as any);
    }).toThrow();
  });
});