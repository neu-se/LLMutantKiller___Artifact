const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise finally behavior", () => {
  it("should handle errors thrown in finally handler correctly", async () => {
    const errorInFinally = new Error("finally error");
    let finallyExecuted = false;

    try {
      await Q.resolve("test")
        .finally(() => {
          finallyExecuted = true;
          throw errorInFinally;
        });
      expect(true).toBe(false); // Should not reach here
    } catch (e) {
      expect(finallyExecuted).toBe(true);
      expect(e).toBe(errorInFinally);
    }
  });
});