// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-dc465e2/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("timeout functionality", () => {
  it("should resolve the promise when the operation completes before timeout", async () => {
    const deferred = Q.defer();
    const timeoutPromise = deferred.promise.timeout(100);

    setTimeout(() => {
      deferred.resolve("success");
    }, 50);

    const result = await timeoutPromise;
    expect(result).toBe("success");
  });
});