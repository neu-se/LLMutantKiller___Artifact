// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/node-geo-point/attempt_1/pending_category/mutant-fa538a2/testCase.test.ts
import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint constructor validation', () => {
  it('should throw RangeError with descriptive message for invalid longitude', () => {
    expect(() => {
      new GeoPoint(45, 200);
    }).toThrow(RangeError);

    try {
      new GeoPoint(45, 200);
    } catch (error) {
      expect(error.message).toBe('bad longitude value');
    }
  });
});