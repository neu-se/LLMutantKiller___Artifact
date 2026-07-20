import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with generator return value", () => {
  it("should resolve with the generator return value when using Q.return in SpiderMonkey-style", async () => {
    const result = await Q.fcall(function() { return 42; });
    expect(result).toBe(42);
  });
});