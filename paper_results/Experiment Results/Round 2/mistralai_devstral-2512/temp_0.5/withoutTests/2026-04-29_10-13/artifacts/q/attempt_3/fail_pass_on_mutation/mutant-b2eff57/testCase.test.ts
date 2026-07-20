const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.any mutation test", () => {
  it("should reject with the last error when all promises are rejected", async () => {
    const error1 = new Error("First error");
    const error2 = new Error("Second error");
    const error3 = new Error("Third error");

    const promises = [
      Q.reject(error1),
      Q.reject(error2),
      Q.reject(error3)
    ];

    try {
      await Q.any(promises);
      fail("Expected promise to reject");
    } catch (error: any) {
      expect(error.message).toContain("Third error");
      expect(error.message).toContain("Q can't get fulfillment value from any promise");
    }
  });
});