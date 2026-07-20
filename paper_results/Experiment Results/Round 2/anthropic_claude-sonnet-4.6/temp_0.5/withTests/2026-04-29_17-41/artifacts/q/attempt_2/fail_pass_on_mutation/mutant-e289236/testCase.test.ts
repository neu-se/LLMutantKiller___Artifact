import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred promise valueOf after resolution", () => {
  it("should not throw when dispatching to an already-resolved deferred promise", () => {
    const deferred = Q.defer();
    
    // Resolve the deferred synchronously
    deferred.resolve(42);
    
    // After resolution, messages is set to undefined.
    // The mutated code has `if (true)` instead of `if (messages)`,
    // so it will attempt messages.push(...) on undefined, throwing a TypeError.
    // We trigger promiseDispatch by calling promiseDispatch directly.
    expect(() => {
      (deferred.promise as any).promiseDispatch(null, "when", [null]);
    }).not.toThrow();
  });
});