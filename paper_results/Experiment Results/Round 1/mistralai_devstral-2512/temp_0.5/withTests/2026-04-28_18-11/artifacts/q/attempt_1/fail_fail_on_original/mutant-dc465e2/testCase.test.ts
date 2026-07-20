import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("timeout mutation test", () => {
  it("should resolve the promise when the original promise fulfills within timeout", async () => {
    const deferred = Q.defer();
    const timeoutPromise = deferred.promise.timeout(100);

    setTimeout(() => {
      deferred.resolve("success");
    }, 50);

    const result = await timeoutPromise;
    expect(result).toBe("success");
  });
});