import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for 45 degree latitude with 90 degree bearing', () => {
    const startPoint = new GeoPoint(45, 0);
    const distance = 100000; // 100 km
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation changes y calculation from multiplication to division
    // This will produce significantly different longitude results
    expect(result.latitude).toBeCloseTo(45, 4);
    expect(result.longitude).toBeCloseTo(1.432, 3);
  });
});