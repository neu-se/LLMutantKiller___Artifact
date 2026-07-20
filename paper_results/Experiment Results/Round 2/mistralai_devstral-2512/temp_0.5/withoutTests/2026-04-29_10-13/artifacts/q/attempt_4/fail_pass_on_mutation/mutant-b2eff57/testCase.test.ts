const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.any mutation test", () => {
  it("should handle null error case correctly", async () => {
    const promises = [
      Q.reject(null),
      Q.reject(new Error("Second error")),
      Q.reject(new Error("Third error"))
    ];

    try {
      await Q.any(promises);
      fail("Expected promise to reject");
    } catch (error: any) {
      expect(error).toBeTruthy();
      expect(error.message).toContain("Q can't get fulfillment value from any promise");
    }
  });
});