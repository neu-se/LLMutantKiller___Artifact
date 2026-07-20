import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when either type or coordinates property is missing', () => {
    const pointWithoutType = {
      coordinates: [0, 0]
    };

    const pointWithoutCoordinates = {
      type: 'Point'
    };

    expect(() => {
      GeoPoint.fromGeoJSON(pointWithoutType as any);
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromGeoJSON(pointWithoutCoordinates as any);
    }).toThrow(TypeError);
  });
});