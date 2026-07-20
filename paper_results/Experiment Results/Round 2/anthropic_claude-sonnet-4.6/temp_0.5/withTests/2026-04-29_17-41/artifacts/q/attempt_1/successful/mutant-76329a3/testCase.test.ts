import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fbind", () => {
  it("should return a function that dispatches apply with the correct arguments when called", async () => {
    const add = function (a: number, b: number) {
      return a + b;
    };

    const boundAdd = Q.fbind(add, 3);
    const result = await boundAdd(4);

    expect(result).toBe(7);
  });
});