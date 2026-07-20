import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError with a specific message when the type is not "Point"', () => {
    const invalidPoint = {
      type: 'InvalidType',
      coordinates: [0, 0]
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidPoint);
    }).toThrow(new TypeError('The value of type should be \'Point\''));
  });
});