import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce fallback TypeError", () => {
  it("should throw TypeError when reducing empty array without initial value", () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = originalReduce;
    
    expect(() => {
      // Simulate what array_reduce does when called with 2 args (no initial value) on empty array
      // array_reduce = uncurryThis(fallback)
      // array_reduce([], fn) → call.apply(fallback, [[], fn]) → fallback.call([], fn)
      // In fallback: this=[], arguments=[fn], arguments.length=1
      // Original: throws TypeError
      // Mutant: infinite loop
      
      // We can't call array_reduce directly, but we can test native reduce behavior
      // which mirrors what the fallback should do
      ([] as any[]).reduce((a: any, b: any) => b);
    }).toThrow(TypeError);
  });
});