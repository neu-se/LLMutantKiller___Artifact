// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-ee37dfb/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.post", () => {
  it("should fulfill a promise when post is called with a method name and arguments", async () => {
    const subject = {
      a: function (value: number) {
        this._a = value;
        return 1 + value;
      }
    };
    const result = await Q.when(Q.post(subject, "a", [1]));
    expect(subject._a).toBe(1);
    expect(result).toBe(2);
  });
});