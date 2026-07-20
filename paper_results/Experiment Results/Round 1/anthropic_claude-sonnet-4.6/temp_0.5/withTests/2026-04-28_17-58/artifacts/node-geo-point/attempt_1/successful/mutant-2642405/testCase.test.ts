import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError with the correct message when the object is missing type or coordinates properties', () => {
    expect(() => {
      GeoPoint.fromGeoJSON({ coordinates: [-0.15, 51.5] } as any);
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromGeoJSON({ coordinates: [-0.15, 51.5] } as any);
    }).toThrow('Object must have type and coordinates');
  });
});