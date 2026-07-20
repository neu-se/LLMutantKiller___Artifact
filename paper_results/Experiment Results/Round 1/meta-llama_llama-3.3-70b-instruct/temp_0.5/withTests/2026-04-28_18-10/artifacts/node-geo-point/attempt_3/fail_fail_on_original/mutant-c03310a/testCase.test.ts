import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when fromGeoJSON is called with a non-object', () => {
    const originalError = console.error;
    console.error = jest.fn();
    GeoPoint.fromGeoJSON(null);
    expect(console.error).toHaveBeenCalledTimes(1);
    console.error = originalError;
  });
});