import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce fallback sparse array mutation", () => {
  it("array_map skips sparse array holes when reduce fallback is used", async () => {
    const nativeReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    jest.resetModules();
    
    let QFresh: any;
    try {
      QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      Array.prototype.reduce = nativeReduce;
    }

    // array_map uses array_reduce internally
    // With a sparse array, original skips holes, mutant doesn't
    const sparse: any[] = [QFresh(10), , QFresh(30)]; // hole at index 1
    
    // allSettled uses array_map over promises
    const settled = await QFresh.allSettled(sparse);
    
    // Original: array_map with sparse array skips hole -> collect has 2 items
    // but then all() wraps them... actually array_map returns collect array
    // which would be [result0, result2] with length 2 (original)
    // vs [result0, undefined_result, result2] with length 3 (mutant)
    
    // Actually with mutant: callback called with undefined promise at index 1
    // Q(undefined) = fulfill(undefined), so it would be fulfilled with undefined
    
    expect(settled).toHaveLength(3);
    expect(settled[0]).toEqual({ state: "fulfilled", value: 10 });
    // With original (skips hole): settled[1] would be missing/undefined in collect
    // With mutant (includes hole): settled[1] = Q(undefined).inspect() = {state:"fulfilled", value:undefined}
    expect(settled[1]).toBeUndefined(); // original skips the hole
  });
});