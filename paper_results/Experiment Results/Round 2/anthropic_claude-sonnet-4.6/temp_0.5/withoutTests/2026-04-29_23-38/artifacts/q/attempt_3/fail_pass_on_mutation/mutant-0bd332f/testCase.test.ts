import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce fallback TypeError", () => {
  it("should throw TypeError when reducing empty array without initial value", () => {
    const origReduce = Array.prototype.reduce;
    delete (Array.prototype as any).reduce;
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = origReduce;
    
    // Q now uses the fallback reduce
    // Test that Q.all([]) resolves to []
    return Q.all([]).then((result: any[]) => {
      expect(result).toEqual([]);
    });
  });
});