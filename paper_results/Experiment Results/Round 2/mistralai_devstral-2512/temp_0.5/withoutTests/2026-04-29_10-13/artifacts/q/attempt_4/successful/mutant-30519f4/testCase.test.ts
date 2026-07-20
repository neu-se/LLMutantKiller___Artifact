const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.all behavior with mixed promises", () => {
  it("should handle already fulfilled promises correctly in mixed array", async () => {
    const mixedPromises = [
      Q(1),
      Q.delay(2, 10),
      Q(3)
    ];

    const startTime = Date.now();
    const result = await Q.all(mixedPromises);
    const endTime = Date.now();

    expect(result).toEqual([1, 2, 3]);
    expect(endTime - startTime).toBeGreaterThanOrEqual(10);
  });
});