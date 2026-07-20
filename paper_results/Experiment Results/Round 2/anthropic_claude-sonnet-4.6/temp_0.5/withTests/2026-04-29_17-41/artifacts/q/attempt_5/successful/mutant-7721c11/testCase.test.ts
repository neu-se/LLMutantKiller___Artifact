describe("array_indexOf fallback", () => {
  it("finds element at index 0 using fallback indexOf", async () => {
    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = originalIndexOf;
    
    Q.resetUnhandledRejections();
    const err = new Error("test");
    const p = Q.reject(err);
    // p is the FIRST (index 0) element in unhandledRejections
    // untrackRejection calls array_indexOf(unhandledRejections, p)
    // Original fallback: i=0, this[0]===p → true → returns 0 → rejection untracked
    // Mutated fallback: if(false) → i-- → infinite loop → hangs
    
    await p.fail(() => {});
    await new Promise(resolve => setTimeout(resolve, 50));
    
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});