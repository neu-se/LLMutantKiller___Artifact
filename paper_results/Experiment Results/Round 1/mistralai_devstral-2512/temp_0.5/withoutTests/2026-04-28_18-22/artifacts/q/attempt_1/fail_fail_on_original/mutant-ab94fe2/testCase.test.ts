import { Q } from "./q";

describe("Q.done unhandled error handling", () => {
  it("should call Q.onerror when an unhandled error occurs in done", (done) => {
    // Setup a spy to track Q.onerror calls
    const onerrorSpy = jest.fn();
    Q.onerror = onerrorSpy;

    // Create a rejected promise that will trigger the error path
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Use done without any handlers to trigger unhandled error
    rejectedPromise.done();

    // Give the nextTick a chance to execute
    setTimeout(() => {
      expect(onerrorSpy).toHaveBeenCalledWith(expect.any(Error));
      done();
    }, 10);
  });
});