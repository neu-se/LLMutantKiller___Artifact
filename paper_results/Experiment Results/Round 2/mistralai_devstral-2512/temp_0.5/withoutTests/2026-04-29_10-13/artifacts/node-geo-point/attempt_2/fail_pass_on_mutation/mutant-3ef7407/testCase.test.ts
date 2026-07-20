import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when only one of type or coordinates properties is missing', () => {
    const pointWithoutType = {
      coordinates: [0, 0]
    };

    expect(() => {
      GeoPoint.fromGeoJSON(pointWithoutType as any);
    }).toThrow(TypeError);

    const pointWithoutCoordinates = {
      type: 'Point'
    };

    expect(() => {
      GeoPoint.fromGeoJSON(pointWithoutCoordinates as any);
    }).toThrow(TypeError);
  });
});