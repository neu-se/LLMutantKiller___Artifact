// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-d00c108/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race behavior", () => {
  it("should resolve when any promise in the array fulfills", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    // Schedule deferred2 to resolve after a short delay
    setTimeout(() => {
      deferred2.resolve("fulfilled");
    }, 10);

    const result = await Q.race(promises);
    expect(result).toBe("fulfilled");
  });
});