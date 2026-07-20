import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.spread", () => {
  it("should call the fulfilled callback with spread array elements as arguments", async () => {
    const result = await Q([1, 2, 3]).spread(function (a: number, b: number, c: number) {
      return a + b + c;
    });
    expect(result).toBe(6);
  });
});