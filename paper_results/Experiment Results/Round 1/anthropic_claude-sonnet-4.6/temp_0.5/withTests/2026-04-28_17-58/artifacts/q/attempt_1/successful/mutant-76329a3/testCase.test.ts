import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fbind", () => {
  it("should return a function that dispatches apply with bound arguments when called", async () => {
    const add = function (a: number, b: number) {
      return a + b;
    };

    const boundAdd = Q.fbind(add, 10);
    const result = await boundAdd(5);

    expect(result).toBe(15);
  });
});