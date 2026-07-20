import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError with message about type and coordinates when object lacks those properties', () => {
    expect(() => {
      GeoPoint.fromGeoJSON({ someOtherProp: 'value' } as any);
    }).toThrow(new TypeError('Object must have type and coordinates'));
  });
});