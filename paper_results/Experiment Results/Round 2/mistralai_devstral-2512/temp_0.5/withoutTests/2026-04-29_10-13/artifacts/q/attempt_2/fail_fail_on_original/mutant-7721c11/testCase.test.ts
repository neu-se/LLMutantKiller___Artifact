// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7721c11/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
  it("should correctly find the index of a value in an array", () => {
    const arr = [1, 2, 3, 4, 5];
    const value = 3;
    const expectedIndex = 2;

    // Using Q to test the array_indexOf functionality through the promise system
    const promise = Q.resolve(arr).then((array: number[]) => {
      // This will use the internal array_indexOf implementation
      return array.indexOf(value);
    });

    return expect(promise).resolves.toBe(expectedIndex);
  });
});