import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf fallback boundary", () => {
  it("should not access out-of-bounds index when searching for a value not in the array", async () => {
    // Force Q to use the fallback array_indexOf by removing native indexOf before load
    const savedIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = savedIndexOf;

    QFresh.resetUnhandledRejections();

    // With the fallback loaded, create a rejection promise
    // unhandledRejections will contain [rejectionPromise]
    const d = QFresh.defer();
    d.reject(new Error("tracked"));
    const rejPromise = d.promise;

    await new Promise(resolve => setTimeout(resolve, 30));
    expect(QFresh.getUnhandledReasons().length).toBe(1);

    // Now: if we can call array_indexOf(unhandledRejections, undefined)
    // Original returns -1 -> no spurious behavior
    // Mutated returns 1 (array length) -> enters if block, spurious splice
    //
    // To trigger this, we need untrackRejection(undefined).
    // The rejection promise's "when" handler calls untrackRejection(this).
    // We can override promiseDispatch to intercept and call the handler with null context.
    
    // Get the internal "when" handler by intercepting promiseDispatch
    let capturedWhenHandler: Function | null = null;
    const origDispatch = rejPromise.promiseDispatch;
    rejPromise.promiseDispatch = function(resolve: any, op: string, operands: any[]) {
      if (op === "when" && operands && typeof operands[0] === "function") {
        capturedWhenHandler = operands[0];
      }
      origDispatch.call(this, resolve, op, operands);
    };

    // Trigger .then() to cause promiseDispatch to be called
    const p = rejPromise.then(null, () => {});
    await p;
    await new Promise(resolve => setTimeout(resolve, 30));

    // The rejection should now be untracked (handled normally)
    expect(QFresh.getUnhandledReasons().length).toBe(0);
  });
});