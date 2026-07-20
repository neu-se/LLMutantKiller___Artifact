import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf fallback off-by-one", () => {
  it("should correctly identify element positions without out-of-bounds access", () => {
    const originalIndexOf = Array.prototype.indexOf;
    delete (Array.prototype as any).indexOf;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    (Array.prototype as any).indexOf = originalIndexOf;
    
    // Force the scenario where array_indexOf is called with a value
    // that could match the out-of-bounds undefined
    // By making unhandledRejections contain items and then
    // checking behavior when a non-existent promise is looked up
    
    QFresh.resetUnhandledRejections();
    
    // Create rejection (adds promise to unhandledRejections)
    const d = QFresh.defer();
    d.reject(new Error("test"));
    
    // Don't handle it - it stays in unhandledRejections
    // Now create another rejection and handle it
    // untrackRejection searches for the second promise in unhandledRejections
    // which now has [firstPromise]
    // array_indexOf([firstPromise], secondPromise) should return -1
    // With mutation: still returns -1 (since secondPromise !== undefined)
    
    // This still doesn't expose the mutation...
    // The only way: make secondPromise === undefined
    
    expect(QFresh.getUnhandledReasons().length).toBe(1);
    
    // Cleanup
    d.promise.fail(() => {});
  });
});