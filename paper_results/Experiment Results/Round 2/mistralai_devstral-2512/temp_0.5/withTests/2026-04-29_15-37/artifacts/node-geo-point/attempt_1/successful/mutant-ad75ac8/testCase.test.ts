// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/node-geo-point/attempt_1/pending_category/mutant-ad75ac8/testCase.test.ts
import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor validation', () => {
  it('should throw RangeError when latitude is not a number', () => {
    expect(() => {
      new GeoPoint("invalid" as any, 0);
    }).toThrow(RangeError);
  });
});