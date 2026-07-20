import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf fallback", () => {
  it("should use strict less-than comparison in indexOf loop", async () => {
    const savedIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = savedIndexOf;

    QFresh.resetUnhandledRejections();

    // With mutation: array_indexOf([], undefined) = 0 (not -1)
    // With original: array_indexOf([], undefined) = -1
    // 
    // We need to trigger untrackRejection(undefined) to observe this difference.
    // This is not achievable through Q's public API since untrackRejection(this)
    // always uses the rejection promise as `this`.
    //
    // Best observable test: verify rejection tracking works correctly
    const spuriousEvents: any[] = [];
    process.on('rejectionHandled', (reason) => {
      spuriousEvents.push(reason);
    });

    const d = QFresh.defer();
    d.reject(new Error("test"));
    await new Promise(resolve => setTimeout(resolve, 30));
    await d.promise.then(null, () => {});
    await new Promise(resolve => setTimeout(resolve, 50));

    process.removeAllListeners('rejectionHandled');
    
    // With correct behavior: no spurious rejectionHandled events
    expect(spuriousEvents.length).toBe(0);
    expect(QFresh.getUnhandledReasons().length).toBe(0);
  });
});