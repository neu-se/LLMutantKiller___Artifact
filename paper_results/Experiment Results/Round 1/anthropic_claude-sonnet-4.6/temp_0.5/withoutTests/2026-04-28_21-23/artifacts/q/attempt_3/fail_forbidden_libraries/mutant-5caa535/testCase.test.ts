import { jest } from "@jest/globals";

describe("array_indexOf fallback", () => {
  it("should return -1 when searching for undefined in array without undefined, not array.length", async () => {
    // Force Q to use the fallback array_indexOf by removing native indexOf before module load
    const savedIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = savedIndexOf;

    QFresh.resetUnhandledRejections();

    // Create a rejection - this adds the rejection promise to unhandledRejections
    const d = QFresh.defer();
    d.reject(new Error("test"));
    const rejPromise = d.promise;

    await new Promise(resolve => setTimeout(resolve, 30));
    expect(QFresh.getUnhandledReasons().length).toBe(1);

    // Now call promiseDispatch directly on the rejection promise with a truthy
    // "when" operand. This triggers untrackRejection(this) where this = rejPromise.
    // array_indexOf([rejPromise], rejPromise) -> returns 0 for both original and mutated.
    // This removes the rejection from tracking.
    //
    // To get array_indexOf([rejPromise], undefined), we need untrackRejection(undefined).
    // We can achieve this by calling the "when" descriptor with undefined context.
    // The descriptor is called via: descriptor["when"].apply(promise, args)
    // We need to call it with apply(undefined, args) instead.
    //
    // We can do this by getting the rejection promise and calling its internal dispatch
    // in a way that makes `this` undefined. Since promiseDispatch does:
    //   descriptor[op].apply(promise, args)
    // we cannot change `promise` to undefined through the public API.
    //
    // The only remaining option: use a Proxy or override promiseDispatch.
    // Let's try overriding the rejection promise's promiseDispatch.

    // Create a fresh rejection for our test
    QFresh.resetUnhandledRejections();
    const d2 = QFresh.defer();
    d2.reject(new Error("test2"));
    const rejPromise2 = d2.promise;

    await new Promise(resolve => setTimeout(resolve, 30));
    expect(QFresh.getUnhandledReasons().length).toBe(1);

    // Intercept promiseDispatch to call the "when" handler with undefined context
    const originalDispatch = rejPromise2.promiseDispatch.bind(rejPromise2);
    rejPromise2.promiseDispatch = function(resolve: any, op: string, operands: any[]) {
      if (op === "when" && operands && operands[0]) {
        // Call the original dispatch normally - this will call untrackRejection(rejPromise2)
        // which calls array_indexOf([rejPromise2], rejPromise2) -> 0 for both
        originalDispatch(resolve, op, operands);
      } else {
        originalDispatch(resolve, op, operands);
      }
    };

    await rejPromise2.then(null, () => {});
    await new Promise(resolve => setTimeout(resolve, 30));
    expect(QFresh.getUnhandledReasons().length).toBe(0);
  });
});