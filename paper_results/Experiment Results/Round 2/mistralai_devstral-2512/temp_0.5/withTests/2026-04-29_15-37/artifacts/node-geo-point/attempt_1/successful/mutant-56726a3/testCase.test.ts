// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/node-geo-point/attempt_1/pending_category/mutant-56726a3/testCase.test.ts
import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject validation', () => {
  it('should throw TypeError with specific message when object lacks latitude or longitude', () => {
    expect(() => {
      GeoPoint.fromObject({ latitude: 51.5 });
    }).toThrow('Object must have latitude and longitude');
  });
});