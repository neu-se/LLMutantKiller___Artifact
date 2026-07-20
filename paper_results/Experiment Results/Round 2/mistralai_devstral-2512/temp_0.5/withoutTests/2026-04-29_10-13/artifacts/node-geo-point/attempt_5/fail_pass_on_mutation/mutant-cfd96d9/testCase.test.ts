import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should correctly validate object type in fromGeoJSON', () => {
    const invalidInput = { type: 'Point', coordinates: [0, 0] };
    Object.setPrototypeOf(invalidInput, null);

    expect(() => {
      GeoPoint.fromGeoJSON(invalidInput);
    }).toThrow(TypeError);
  });
});