const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise finally behavior", () => {
  it("should propagate errors thrown in finally handler", async () => {
    const originalError = new Error("original");
    const finallyError = new Error("finally");

    try {
      await Q.reject(originalError)
        .finally(() => {
          throw finallyError;
        });
      expect(true).toBe(false); // Should not reach here
    } catch (e) {
      expect(e).toBe(finallyError);
    }
  });
});