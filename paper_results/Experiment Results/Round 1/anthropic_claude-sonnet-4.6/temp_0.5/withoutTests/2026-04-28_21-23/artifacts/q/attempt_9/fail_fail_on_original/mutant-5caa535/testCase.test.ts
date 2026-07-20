import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf fallback", () => {
  it("should return -1 not 1 when searching for undefined in single-element array", async () => {
    const savedIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = savedIndexOf;

    QFresh.resetUnhandledRejections();

    const d = QFresh.defer();
    d.reject(new Error("test"));

    await new Promise(resolve => setTimeout(resolve, 30));
    expect(QFresh.getUnhandledReasons().length).toBe(1);

    // Intercept Function.prototype.apply to make the "when" descriptor
    // execute with undefined as `this` (simulating untrackRejection(undefined))
    const origApply = Function.prototype.apply;
    let intercepted = false;
    (Function.prototype as any).apply = function(thisArg: any, argsArray: any) {
      if (!intercepted &&
          thisArg !== null &&
          thisArg !== undefined &&
          typeof thisArg === "object" &&
          typeof thisArg.inspect === "function") {
        try {
          const state = thisArg.inspect();
          if (state && state.state === "rejected") {
            intercepted = true;
            return origApply.call(this, undefined, argsArray);
          }
        } catch (e) { /* ignore */ }
      }
      return origApply.call(this, thisArg, argsArray);
    };

    const spuriousEvents: any[] = [];
    const listener = (reason: any) => spuriousEvents.push(reason);
    process.on("rejectionHandled", listener);

    try {
      d.promise.then(null, () => {});
      await new Promise(resolve => setTimeout(resolve, 100));
    } finally {
      (Function.prototype as any).apply = origApply;
      process.removeListener("rejectionHandled", listener);
    }

    // Original: array_indexOf([promise], undefined) = -1, no spurious event
    // Mutated: array_indexOf([promise], undefined) = 1, spurious rejectionHandled fires
    expect(spuriousEvents.length).toBe(0);
  });
});