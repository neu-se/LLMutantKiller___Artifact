import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 1000; // 1 kilometer
    const bearing = 0; // north

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);
    expect(result.latitude).toBeCloseTo(0.009, 3); 
    expect(result.longitude).toBeCloseTo(0, 3);
  });
});