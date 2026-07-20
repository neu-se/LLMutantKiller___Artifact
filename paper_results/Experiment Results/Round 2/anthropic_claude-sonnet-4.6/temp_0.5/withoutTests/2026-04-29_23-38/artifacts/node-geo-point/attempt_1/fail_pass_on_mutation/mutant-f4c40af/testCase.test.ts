import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point given a starting coordinate, distance, and bearing', () => {
    // Starting from London (51.5074, -0.1278), heading north (bearing=0) for 1000 meters
    const start = new GeoPoint(51.5074, -0.1278);
    const distance = 1000; // meters
    const bearing = 0; // north

    const destination = GeoPoint.calculateDestination(start, distance, bearing);

    // The destination should be approximately 0.009 degrees north of London
    // latitude should increase slightly, longitude should remain approximately the same
    expect(destination.latitude).toBeCloseTo(51.5164, 3);
    expect(destination.longitude).toBeCloseTo(-0.1278, 3);
  });
});