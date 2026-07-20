import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("NodeJS environment detection", () => {
  it("should correctly handle promise rejection in non-NodeJS environment", (done) => {
    // This test verifies that Q correctly handles promise rejections
    // The mutation changes isNodeJS from false to true, which affects rejection handling

    const error = new Error("test error");
    let errorHandled = false;

    // Create a rejected promise
    const rejectedPromise = Q.reject(error);

    // In Node.js, uncaught rejections are handled differently than in browsers
    // The original code (isNodeJS=false) should use browser-style handling
    rejectedPromise.then(null, (e: any) => {
      errorHandled = true;
      expect(e).toBe(error);
    });

    // Give time for the promise to be handled
    setTimeout(() => {
      expect(errorHandled).toBe(true);
      done();
    }, 10);
  });
});