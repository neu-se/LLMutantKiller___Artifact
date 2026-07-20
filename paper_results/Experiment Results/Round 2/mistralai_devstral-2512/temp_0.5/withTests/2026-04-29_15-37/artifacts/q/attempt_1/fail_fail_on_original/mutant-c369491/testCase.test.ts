// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress notification", () => {
  it("should correctly dispatch progress notifications with 'when' operation", async () => {
    const deferred = Q.defer();
    let progressCalled = false;
    let progressValue: any = null;

    const promise = deferred.promise.then(
      () => {},
      () => {},
      (value: any) => {
        progressCalled = true;
        progressValue = value;
      }
    );

    // Notify with a test value
    deferred.notify("test-progress");

    // Resolve to trigger the progress handler
    deferred.resolve("done");

    // Wait for the next tick to ensure async operations complete
    await new Promise(resolve => setTimeout(resolve, 10));

    // Verify progress was called with correct value
    expect(progressCalled).toBe(true);
    expect(progressValue).toBe("test-progress");
  });
});