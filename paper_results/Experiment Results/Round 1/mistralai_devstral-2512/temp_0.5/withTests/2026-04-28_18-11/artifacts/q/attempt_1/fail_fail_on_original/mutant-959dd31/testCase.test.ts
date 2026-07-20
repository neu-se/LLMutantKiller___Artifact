import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("timeout error handling", () => {
  it("should reject with a timeout error when promise is too slow", async () => {
    const deferred = Q.defer();
    const timeoutPromise = Q.timeout(deferred.promise, 50);

    // Ensure the promise doesn't resolve before timeout
    setTimeout(() => {
      deferred.resolve("resolved");
    }, 100);

    let error: Error | undefined;
    try {
      await timeoutPromise;
    } catch (e) {
      error = e as Error;
    }

    expect(error).toBeDefined();
    expect(error!.message).toMatch(/time/i);
  });
});