import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('calculateDestination', () => {
  it('should correctly calculate destination point with bearing 45 degrees', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000;
    const bearing = 45;

    const result = startPoint.calculateDestination(distance, bearing);

    expect(result.latitude).toBeCloseTo(0.0636, 3);
    expect(result.longitude).toBeCloseTo(0.0636, 3);
  });
});