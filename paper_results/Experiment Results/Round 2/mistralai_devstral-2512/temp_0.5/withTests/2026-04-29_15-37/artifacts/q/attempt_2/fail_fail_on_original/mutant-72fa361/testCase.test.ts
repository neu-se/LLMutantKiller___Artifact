// Test case to detect the mutation in makeStackTraceLong function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation test", () => {
  it("should preserve stack traces when long stack support is enabled", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises that will reject
    const error = new Error("Test error");
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    // Create a promise chain with multiple levels
    const promiseChain = Q().then(() => {
      return deferred1.promise;
    }).then(() => {
      return deferred2.promise;
    });

    // Set up error handling
    let caughtError: any = null;
    promiseChain.fail((e: any) => {
      caughtError = e;
    });

    // Reject the promises to trigger the error path
    deferred1.reject(error);
    deferred2.reject(error);

    // Check that the error has a stack trace with multiple frames
    expect(caughtError).not.toBeNull();
    expect(caughtError.stack).toBeDefined();
    expect(caughtError.stack.split('\n').length).toBeGreaterThan(2);
    expect(caughtError.stack).toContain("From previous event");
  });
});