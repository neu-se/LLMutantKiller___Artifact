import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise error handling", () => {
  it("should properly handle null errors in long stack traces", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that rejects with null
    const deferred = Q.defer();
    setTimeout(() => deferred.reject(null), 0);

    // Verify that null errors don't cause issues in the stack trace handling
    await expect(deferred.promise).rejects.toBeNull();

    // Disable long stack traces to clean up
    Q.longStackSupport = false;
  });
});