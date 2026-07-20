import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.spread", () => {
  it("should pass array elements as individual arguments to the fulfilled callback", async () => {
    const result = await Q([1, 2, 3]).spread(function (a: number, b: number, c: number) {
      return a + b + c;
    });
    expect(result).toBe(6);
  });
});