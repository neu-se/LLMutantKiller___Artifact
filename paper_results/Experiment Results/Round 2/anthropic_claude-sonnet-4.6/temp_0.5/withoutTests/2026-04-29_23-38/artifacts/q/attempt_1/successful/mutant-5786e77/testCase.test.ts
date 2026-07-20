import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.spread", () => {
  it("should spread array values as arguments to the fulfilled callback", async () => {
    const result = await Q([1, 2, 3]).spread(function (a: number, b: number, c: number) {
      return a + b + c;
    });
    expect(result).toBe(6);
  });
});