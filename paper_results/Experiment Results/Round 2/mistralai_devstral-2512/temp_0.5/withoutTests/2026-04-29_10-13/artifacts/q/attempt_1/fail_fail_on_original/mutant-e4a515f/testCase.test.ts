// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-e4a515f/testCase.test.ts
import { Q } from "./q.js";

describe("Promise constructor", () => {
  it("should accept a function resolver", () => {
    const promise = new Q.Promise((resolve) => {
      resolve("success");
    });
    return promise.then((value) => {
      expect(value).toBe("success");
    });
  });
});