// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/node-geo-point/attempt_1/pending_category/mutant-2642405/testCase.test.ts

import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON validation', () => {
  it('should throw TypeError with descriptive message when GeoJSON object lacks type and coordinates', () => {
    const invalidGeoJSON = { foo: 'bar' };
    expect(() => {
      GeoPoint.fromGeoJSON(invalidGeoJSON);
    }).toThrow(TypeError);
    try {
      GeoPoint.fromGeoJSON(invalidGeoJSON);
    } catch (error) {
      expect((error as TypeError).message).toBe('Object must have type and coordinates');
    }
  });
});