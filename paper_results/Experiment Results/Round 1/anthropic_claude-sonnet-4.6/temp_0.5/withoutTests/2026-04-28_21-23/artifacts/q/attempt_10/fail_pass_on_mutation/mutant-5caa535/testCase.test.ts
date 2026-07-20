import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf fallback", () => {
  it("should return -1 not 0 for undefined search in empty array using fallback indexOf", async () => {
    const savedIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = savedIndexOf;

    QFresh.resetUnhandledRejections();

    // Create rejection but DON'T wait - so it's not yet in reportedUnhandledRejections
    const d = QFresh.defer();
    d.reject(new Error("test"));

    // Get innerRejection immediately (before unhandledRejection fires)
    // We need to handle it quickly so it's removed from unhandledRejections
    // before the unhandledRejection event fires
    
    // Handle it immediately - this calls untrackRejection(innerRejection)
    // innerRejection IS in unhandledRejections but NOT in reportedUnhandledRejections
    // So untrackRejection removes it from unhandledRejections but doesn't emit rejectionHandled
    await d.promise.then(null, () => {});
    
    // Now unhandledRejections is empty
    // reportedUnhandledRejections is also empty (unhandledRejection never fired)
    
    // Now intercept apply to call untrackRejection(undefined) on empty arrays
    // With original: array_indexOf([], undefined) = -1, no action
    // With mutated: array_indexOf([], undefined) = 0, enters if block
    //   array_indexOf([], undefined) = 0 again, emits rejectionHandled!
    
    // But how do we call untrackRejection(undefined) now?
    // We need another rejection promise to intercept...
    
    const d2 = QFresh.defer();
    d2.reject(new Error("test2"));
    
    // Don't wait - intercept immediately
    const origApply = Function.prototype.apply;
    let intercepted = false;
    (Function.prototype as any).apply = function(this: any, thisArg: any, argsArray: any) {
      if (!intercepted && thisArg != null && typeof thisArg === "object" &&
          typeof thisArg.promiseDispatch === "function") {
        intercepted = true;
        return origApply.call(this, undefined, argsArray);
      }
      return origApply.call(this, thisArg, argsArray);
    };

    const spurious: number[] = [];
    const listener = () => spurious.push(1);
    process.on("rejectionHandled", listener);

    try {
      d2.promise.then(null, () => {});
      await new Promise(resolve => setTimeout(resolve, 100));
    } finally {
      (Function.prototype as any).apply = origApply;
      process.removeListener("rejectionHandled", listener);
    }

    // With original: untrackRejection(undefined) on [innerRejection2] → at=-1, no event
    // With mutated: untrackRejection(undefined) on [innerRejection2] → at=1, 
    //   then array_indexOf([], undefined) = 0 → rejectionHandled fires!
    expect(spurious.length).toBe(0);
  });
});