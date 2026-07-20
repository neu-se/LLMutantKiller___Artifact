const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.any", () => {
  it("should resolve when any promise in the array is fulfilled", async () => {
    const promises = [
      Q.delay(100).then(() => "slow"),
      Q.resolve("fast")
    ];
    const result = await Q.any(promises);
    expect(result).toBe("fast");
  });
});