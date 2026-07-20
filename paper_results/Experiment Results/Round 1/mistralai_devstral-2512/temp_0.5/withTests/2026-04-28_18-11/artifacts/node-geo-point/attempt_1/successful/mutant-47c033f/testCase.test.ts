// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/node-geo-point/attempt_1/pending_category/mutant-47c033f/testCase.test.ts
import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDistance', () => {
  it('should calculate distance between two points', () => {
    const point1 = new GeoPoint(51.5, -0.15);
    const point2 = new GeoPoint(51.6, -0.16);
    const distance = point1.calculateDistance(point2);
    expect(Math.round(distance)).toBe(11142);
  });
});