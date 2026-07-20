import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError with a specific message when the type is not Point', () => {
    const invalidGeoJSON = {
      type: 'InvalidType',
      coordinates: [-0.15, 51.5]
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidGeoJSON);
    }).toThrow('The value of type should be \'Point\'');
  });
});