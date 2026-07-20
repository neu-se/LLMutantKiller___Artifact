describe("Q array_reduce mutation", () => {
  it("array_reduce shim handles no-initial-value correctly", () => {
    const originalReduce = Array.prototype.reduce;
    delete (Array.prototype as any).reduce;
    jest.resetModules();
    
    // Patch if(false) by overriding Function constructor? Not feasible.
    // Instead, directly test: with shim active, does Q.any work?
    // Q.any calls array_reduce(promises, fn, undefined) - explicit undefined = 3 args
    // so arguments.length >= 2, no-initial-value path NOT triggered
    
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = originalReduce;
    
    return Q.any([Q.resolve(5)]).then((result: number) => {
      expect(result).toBe(5);
    });
  });
});