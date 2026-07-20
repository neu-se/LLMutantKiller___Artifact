import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q spread fulfilled values", () => {
  it("spread applies fulfilled array values as arguments", async () => {
    const result = await Q.spread([1, 2, 3], function(a, b, c) {
      return a + b + c;
    });
    expect(result).toBe(6);
  });
});