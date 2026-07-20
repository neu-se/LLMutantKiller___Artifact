import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when only one of type or coordinates is missing', () => {
    const pointWithoutType = {
      coordinates: [0, 0]
    };

    expect(() => {
      GeoPoint.fromGeoJSON(pointWithoutType as any);
    }).toThrow(TypeError);
  });
});