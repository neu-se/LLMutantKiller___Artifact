import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError with specific message when type is not Point', () => {
    const invalidGeoJSON = {
      type: 'InvalidType',
      coordinates: [0, 0]
    };
    expect(() => {
      GeoPoint.fromGeoJSON(invalidGeoJSON);
    }).toThrow(TypeError);
  });
});