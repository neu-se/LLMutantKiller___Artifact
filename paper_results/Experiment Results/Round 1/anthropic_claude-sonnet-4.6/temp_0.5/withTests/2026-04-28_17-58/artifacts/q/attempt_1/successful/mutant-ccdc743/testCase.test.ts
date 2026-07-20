import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.fin with a valid callback", () => {
  it("should fulfill with the original value when the callback is a valid function", async () => {
    const result = await Q("foo").fin(function () {
      // valid callback - does nothing special
    });
    expect(result).toBe("foo");
  });
});