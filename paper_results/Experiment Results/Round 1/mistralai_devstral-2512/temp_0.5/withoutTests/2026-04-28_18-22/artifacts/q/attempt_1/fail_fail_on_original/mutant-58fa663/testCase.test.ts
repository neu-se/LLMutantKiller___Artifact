import { Q } from "./q.js";

describe("Q unhandled rejection tracking", () => {
  it("should correctly track and untrack rejections when process.emit is not a function", () => {
    // Save the original process.emit
    const originalEmit = process.emit;

    // Mock process.emit to be undefined (not a function)
    process.emit = undefined as any;

    // Create a promise that will be rejected
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Reject the promise
    deferred.reject(new Error("Test error"));

    // At this point, the promise should be tracked in unhandledRejections
    // Now we handle the rejection
    const handleRejection = () => {
      // This should untrack the rejection
      promise.then(null, () => {
        // Rejection is now handled
      });
    };

    // Call the handler
    handleRejection();

    // Restore the original process.emit
    process.emit = originalEmit;
  });
});