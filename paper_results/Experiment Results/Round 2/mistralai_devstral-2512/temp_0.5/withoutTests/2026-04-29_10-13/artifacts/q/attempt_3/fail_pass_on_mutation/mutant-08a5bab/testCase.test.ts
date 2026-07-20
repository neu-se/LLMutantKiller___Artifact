const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal Q frames from stack traces", async () => {
    const error = new Error("Test error");
    const promise = Q.reject(error);

    try {
      await promise;
    } catch (e: any) {
      // The mutation causes all frames to be considered internal, which would
      // result in an empty stack trace after filtering
      expect(e.stack).toBeTruthy();
      expect(e.stack.split('\n').length).toBeGreaterThan(1);
    }
  });
});