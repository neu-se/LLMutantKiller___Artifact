import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for point at 45 degrees latitude with bearing 90', () => {
    const startPoint = new GeoPoint(45, 0);
    const result = GeoPoint.calculateDestination(startPoint, 100000, 90);
    expect(result.longitude).toBeCloseTo(1.2717, 4);
    expect(result.latitude).toBeCloseTo(44.9929, 4);
  });
});