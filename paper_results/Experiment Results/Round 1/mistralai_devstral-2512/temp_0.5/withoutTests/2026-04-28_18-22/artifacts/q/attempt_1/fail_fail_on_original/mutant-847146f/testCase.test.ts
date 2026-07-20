import { Q } from "./q.js";

describe("Q.catch method", () => {
  it("should be accessible via Q.catch", () => {
    const promise = Q.reject(new Error("test error"));
    const catchSpy = jest.fn();

    // This test verifies that Q.catch exists and can be called
    // The mutation changes Q["catch"] to Q[""] which breaks this functionality
    Q.catch(promise, catchSpy);

    // Give the promise time to settle
    return promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      () => {
        // We expect the catch handler to be called
        expect(typeof Q.catch).toBe("function");
      }
    );
  });
});