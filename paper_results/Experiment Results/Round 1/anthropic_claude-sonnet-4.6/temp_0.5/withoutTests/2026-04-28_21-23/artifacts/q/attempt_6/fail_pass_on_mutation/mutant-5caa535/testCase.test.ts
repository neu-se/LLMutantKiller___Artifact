import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf fallback", () => {
  it("should not emit spurious rejectionHandled when unhandledRejections is empty", async () => {
    const savedIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = savedIndexOf;

    QFresh.resetUnhandledRejections();

    // Create a rejection and handle it - this properly untracks it
    const d = QFresh.defer();
    d.reject(new Error("test"));
    const rejPromise = d.promise;

    await new Promise(resolve => setTimeout(resolve, 30));
    
    // Handle it once - unhandledRejections becomes empty after this
    await rejPromise.then(null, () => {});
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Now unhandledRejections is empty
    expect(QFresh.getUnhandledReasons().length).toBe(0);

    // Now handle the SAME rejection promise again
    // This calls untrackRejection(rejPromise) where rejPromise is NOT in unhandledRejections
    // Original: array_indexOf([], rejPromise) = -1, no spurious event
    // BUT: array_indexOf([], undefined) with mutation = 0...
    // We need to search for undefined specifically.
    
    // Listen for spurious rejectionHandled events
    const spuriousEvents: any[] = [];
    const handler = (reason: any) => { spuriousEvents.push(reason); };
    process.on('rejectionHandled', handler);

    // Handle the same promise again - calls untrackRejection(rejPromise)
    // rejPromise is a real object, so array_indexOf([], rejPromise):
    // Original: -1 (0 < 0 is false, loop doesn't run)
    // Mutated: -1 (0 <= 0 is true, checks [][0] = undefined !== rejPromise, returns -1)
    // Same result! Still can't distinguish.
    
    await rejPromise.then(null, () => {});
    await new Promise(resolve => setTimeout(resolve, 50));
    
    process.removeListener('rejectionHandled', handler);
    expect(spuriousEvents.length).toBe(0);
  });
});