const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.any mutation test", () => {
  it("should handle falsy error values correctly", async () => {
    const promises = [
      Q.reject(0),
      Q.reject(""),
      Q.reject(false)
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