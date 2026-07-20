import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError with message about type and coordinates when object lacks those properties', () => {
    expect(() => {
      GeoPoint.fromGeoJSON({ latitude: 51.5, longitude: -0.15 } as any);
    }).toThrow('Object must have type and coordinates');
  });
});