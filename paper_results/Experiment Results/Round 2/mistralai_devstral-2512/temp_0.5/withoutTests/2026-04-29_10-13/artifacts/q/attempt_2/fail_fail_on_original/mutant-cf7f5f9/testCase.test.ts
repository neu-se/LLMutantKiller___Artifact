import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise progress handler error handling", () => {
  it("should call Q.onerror when an error is thrown in progress handler", (done) => {
    // Set up a custom error handler
    const customErrorHandler = jest.fn();
    Q.onerror = customErrorHandler;

    // Create a deferred promise
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Set up a progress handler that throws an error
    const progressHandler = jest.fn(() => {
      throw new Error("Progress handler error");
    });

    // Attach the progress handler
    promise.then(null, null, progressHandler);

    // Notify progress (which should trigger the error)
    deferred.notify("test progress");

    // Give time for the async operation to complete
    setTimeout(() => {
      expect(customErrorHandler).toHaveBeenCalledWith(expect.any(Error));
      expect(customErrorHandler.mock.calls[0][0].message).toBe("Progress handler error");
      done();
    }, 10);
  });
});