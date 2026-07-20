import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.spread", () => {
  it("should spread array values as arguments to the fulfilled callback", async () => {
    const promise = Q.all([Q(1), Q(2), Q(3)]);
    const result = await promise.spread((a: number, b: number, c: number) => {
      return a + b + c;
    });
    expect(result).toBe(6);
  });
});