import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
  it("resolves with the correct value from a generator that yields a promise", async () => {
    const result = await Q.async(function* () {
      const x = yield Q.resolve(10);
      const y = yield Q.resolve(20);
      return x + y;
    })();
    expect(result).toBe(30);
  });
});