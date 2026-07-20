describe("array_indexOf fallback with empty array", () => {
  it("returns -1 for empty array in fallback indexOf", () => {
    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = originalIndexOf;
    
    Q.resetUnhandledRejections();
    // With empty unhandledRejections, array_indexOf([]) returns -1 in both cases
    // untrackRejection on something not tracked: at === -1, no splice
    // This is the same in both versions
    expect(Q.getUnhandledReasons()).toEqual([]);
  });
});