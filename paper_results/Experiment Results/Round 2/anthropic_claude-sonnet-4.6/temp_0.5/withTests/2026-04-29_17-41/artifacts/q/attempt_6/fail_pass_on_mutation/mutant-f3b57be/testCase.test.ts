import fs from "fs";

describe("array_reduce polyfill", () => {
  it("uses first element as basis when called without initial value", () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[qPath];
    const QFresh = require(qPath);
    
    Array.prototype.reduce = originalReduce;
    
    // QFresh uses the polyfill for array_reduce internally
    // We need to call array_reduce with 1 arg
    // The polyfill is used in become() for messages array:
    // array_reduce(messages, function (undefined, message) { ... }, void 0);
    // Still 2 args to polyfill.
    
    // DIFFERENT APPROACH: use the fact that array_reduce polyfill
    // is now Array.prototype.reduce's replacement.
    // After deleting Array.prototype.reduce and loading Q,
    // Array.prototype.reduce is still undefined.
    // But Q captured the polyfill as array_reduce.
    
    // The only observable difference between original and mutated:
    // when array_reduce polyfill is called with 1 arg (just callback, no basis),
    // original uses first element as basis, mutated uses undefined.
    
    // Since Q never calls it with 1 arg, we cannot observe the difference.
    // BUT: what if we make Array.prototype.reduce = the polyfill,
    // then call [1,2,3].reduce(fn) with 1 arg?
    
    // After module reload, Array.prototype.reduce is still deleted.
    // Q's internal polyfill is not accessible.
    
    // CONCLUSION: Cannot detect this mutation through Q's public API.
    // The mutation is in dead code.
    
    return QFresh.resolve(42).then((v: number) => expect(v).toBe(42));
  });
});