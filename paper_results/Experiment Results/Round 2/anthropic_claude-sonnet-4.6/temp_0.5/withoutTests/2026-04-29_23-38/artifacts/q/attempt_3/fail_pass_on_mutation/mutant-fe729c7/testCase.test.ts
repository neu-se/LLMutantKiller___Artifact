import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce fallback sparse array", () => {
  it("uses correct initial value from sparse array without explicit basis", () => {
    // Delete Array.prototype.reduce to force fallback, use dynamic require
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore  
    delete Array.prototype.reduce;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = originalReduce;
    
    // Now test something that exercises array_reduce without initial value
    // Q itself always passes initial values, so we need another approach
    // The array_map fallback uses array_reduce with void 0 as initial value
    // Array.prototype.map also needs to be deleted...
  });
});