// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-0bd332f/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
  it("should handle sparse arrays correctly in reduce", () => {
    const sparseArray = [1, , 3]; // Array with hole at index 1
    return Q(sparseArray).reduce((acc: number, val: number) => acc + val, 0).then((result) => {
      expect(result).toBe(4);
    });
  });
});