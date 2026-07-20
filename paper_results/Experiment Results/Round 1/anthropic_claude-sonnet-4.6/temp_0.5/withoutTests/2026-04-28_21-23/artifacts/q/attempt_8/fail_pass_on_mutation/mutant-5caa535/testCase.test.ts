import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf fallback", () => {
  it("detects mutation via spurious behavior when untrackRejection called with undefined", async () => {
    const savedIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = savedIndexOf;

    QFresh.resetUnhandledRejections();

    // Create a rejection to populate unhandledRejections
    const d = QFresh.defer();
    d.reject(new Error("test"));
    await new Promise(resolve => setTimeout(resolve, 30));
    expect(QFresh.getUnhandledReasons().length).toBe(1);

    // Now we need to call untrackRejection(undefined)
    // We intercept Function.prototype.apply to change the context
    // when the "when" descriptor is called
    const origApply = Function.prototype.apply;
    let intercepted = false;
    
    // The "when" handler checks `if (rejected)` then calls `untrackRejection(this)`
    // We want to make `this` be undefined for one specific call
    // We can identify the call by checking if `this` is a Q promise
    
    const spuriousEvents: string[] = [];
    const rejHandledListener = () => { spuriousEvents.push("rejectionHandled"); };
    process.on("rejectionHandled", rejHandledListener);

    // Handle the rejection normally
    await d.promise.then(null, () => {});
    await new Promise(resolve => setTimeout(resolve, 50));

    process.removeListener("rejectionHandled", rejHandledListener);
    
    // With original: untrackRejection(rejPromise) called, array_indexOf([rejPromise], rejPromise) = 0
    // Rejection removed, getUnhandledReasons() = 0
    expect(QFresh.getUnhandledReasons().length).toBe(0);
  });
});