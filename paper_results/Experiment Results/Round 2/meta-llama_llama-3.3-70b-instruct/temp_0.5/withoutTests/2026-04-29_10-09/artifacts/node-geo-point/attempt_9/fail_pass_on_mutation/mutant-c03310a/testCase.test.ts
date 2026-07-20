import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a non-object', () => {
    let errorThrown = false;
    try {
      GeoPoint.fromGeoJSON(null);
    } catch (error) {
      errorThrown = true;
    }
    expect(errorThrown).toBe(true);
    if (!errorThrown) {
      throw new Error('Expected an error to be thrown');
    }
  });
});