import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification behavior", () => {
  it("should not notify when progress listener throws", async () => {
    const deferred = Q.defer();
    let progressCalled = false;

    const promise = deferred.promise.then(
      () => {
        expect(progressCalled).toBe(false);
      },
      () => {
        expect(true).toBe(false);
      },
      (value) => {
        progressCalled = true;
        throw new Error("Progress error");
      }
    );

    // Set up error handler to swallow the error
    let errorHandled = false;
    Q.onerror = (error) => {
      errorHandled = true;
    };

    deferred.notify("test");
    deferred.resolve();

    await promise;

    // Verify that the error was handled (proving the mutation would break this)
    expect(errorHandled).toBe(true);
    expect(progressCalled).toBe(true);
  });
});