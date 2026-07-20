import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promised", () => {
  it("should resolve promised arguments and pass them to the callback", () => {
    const add = Q.promised(function(this: any, a: number, b: number) {
      return a + b;
    });

    return add(Q(4), Q(5)).then((result: number) => {
      expect(result).toBe(9);
    });
  });
});