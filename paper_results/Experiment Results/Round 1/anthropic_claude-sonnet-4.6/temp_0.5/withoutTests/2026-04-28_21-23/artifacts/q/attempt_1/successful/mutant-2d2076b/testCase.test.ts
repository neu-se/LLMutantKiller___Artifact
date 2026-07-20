import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay", () => {
  it("should resolve with the value when called with two arguments (object, timeout)", async () => {
    const result = await Q.delay(42, 10);
    expect(result).toBe(42);
  });
});