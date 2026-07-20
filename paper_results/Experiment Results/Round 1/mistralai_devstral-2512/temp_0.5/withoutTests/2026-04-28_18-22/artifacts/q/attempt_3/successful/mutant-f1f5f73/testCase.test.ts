const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.tap", () => {
  it("should return a promise that resolves with the original value after invoking the callback", async () => {
    const originalValue = "test";
    const callback = jest.fn().mockResolvedValue(undefined);

    const result = await Q.tap(originalValue, callback);

    expect(callback).toHaveBeenCalledWith(originalValue);
    expect(result).toBe(originalValue);
  });
});