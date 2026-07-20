// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer mutation test", () => {
  it("should resolve promise correctly when resolve is called multiple times", async () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // First resolve call
    deferred.resolve(10);

    // Second resolve call (should be ignored in original code)
    deferred.resolve(20);

    // The promise should be resolved with the first value (10)
    const result = await promise;
    expect(result).toBe(10);
  });
});