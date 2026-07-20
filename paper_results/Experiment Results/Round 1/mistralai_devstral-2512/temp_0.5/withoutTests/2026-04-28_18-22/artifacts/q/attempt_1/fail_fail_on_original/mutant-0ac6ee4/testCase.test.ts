// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-0ac6ee4/testCase.test.ts
import { Q } from "./q.js";

describe("Q.timeout error message", () => {
  it("should include 'ms' unit in timeout error message", async () => {
    const deferred = Q.defer();
    const timeoutPromise = deferred.promise.timeout(100);

    let error: Error | null = null;
    try {
      await timeoutPromise;
    } catch (e) {
      error = e as Error;
    }

    expect(error).not.toBeNull();
    expect(error!.message).toContain("Timed out after 100 ms");
    expect(error!.message).toMatch(/ms$/);
  });
});