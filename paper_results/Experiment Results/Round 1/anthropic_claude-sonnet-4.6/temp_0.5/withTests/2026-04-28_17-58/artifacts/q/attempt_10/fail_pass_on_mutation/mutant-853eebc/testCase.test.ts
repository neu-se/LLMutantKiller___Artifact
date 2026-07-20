import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map with arguments object in promised", () => {
  it("Q.promised correctly maps over arguments array-like object", () => {
    const multiply = Q.promised(function(a: number, b: number, c: number) {
      return a * b * c;
    });
    
    return multiply(Q(2), Q(3), Q(4)).then(function(result: number) {
      expect(result).toBe(24);
    });
  });
});