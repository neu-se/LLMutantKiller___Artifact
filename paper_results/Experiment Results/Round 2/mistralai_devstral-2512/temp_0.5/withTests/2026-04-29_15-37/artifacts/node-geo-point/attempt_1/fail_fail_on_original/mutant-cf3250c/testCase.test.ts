import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('calculateDestination', () => {
  it('should correctly calculate destination point with bearing 90 degrees', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000;
    const bearing = 90;

    const result = startPoint.calculateDestination(distance, bearing);

    expect(result.latitude).toBeCloseTo(0, 4);
    expect(result.longitude).toBeCloseTo(0.08983, 4);
  });
});