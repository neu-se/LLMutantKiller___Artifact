import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination with specific bearing and distance', () => {
    const startPoint = new GeoPoint(0, 0);
    const result = GeoPoint.calculateDestination(startPoint, 100000, 90);
    expect(result.longitude).toBeCloseTo(0.8993216059187716, 10);
    expect(result.latitude).toBeCloseTo(0, 10);
  });
});