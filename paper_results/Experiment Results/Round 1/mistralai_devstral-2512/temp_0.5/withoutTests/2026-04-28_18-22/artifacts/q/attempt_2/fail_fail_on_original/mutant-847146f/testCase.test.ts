const Q = require("./q.js");

describe("Q.catch method", () => {
  it("should be accessible and functional", () => {
    const promise = Q.reject(new Error("test error"));
    let catchCalled = false;

    // This test verifies that Q.catch exists and can be called
    // The mutation changes Q["catch"] to Q[""] which breaks this functionality
    Q.catch(promise, function() {
      catchCalled = true;
    });

    // Give the promise time to settle
    return promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      () => {
        // We expect the catch handler to be called
        expect(typeof Q.catch).toBe("function");
        expect(catchCalled).toBe(true);
      }
    );
  });
});