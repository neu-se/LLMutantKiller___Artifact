const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.spread", () => {
  it("should spread array values as arguments to the fulfillment callback", async () => {
    const promise = Q.spread([Q(10), Q(20)], (a: number, b: number) => {
      return a + b;
    });

    const result = await promise;
    expect(result).toBe(30);
  });
});