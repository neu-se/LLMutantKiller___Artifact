import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.finally", () => {
  it("should pass through the resolved value when callback is a valid function", async () => {
    const result = await Q(42)["finally"](function () {
      // valid callback
    });
    expect(result).toBe(42);
  });
});