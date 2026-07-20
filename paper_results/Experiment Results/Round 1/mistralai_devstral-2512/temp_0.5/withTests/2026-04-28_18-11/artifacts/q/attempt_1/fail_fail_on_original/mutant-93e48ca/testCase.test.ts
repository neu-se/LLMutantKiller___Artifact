// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-93e48ca/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.post behavior with undefined name", () => {
  it("should apply the function when name is undefined", () => {
    const testFn = (a: number, b: number, c: number) => a + b + c;
    return Q(testFn)
      .post(undefined, [1, 2, 3])
      .then((result: number) => {
        expect(result).toBe(6);
      });
  });
});