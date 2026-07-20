import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred promise dispatch after resolution", () => {
  it("should correctly forward messages to resolved promise after deferred is resolved", async () => {
    const deferred = Q.defer();
    
    // Resolve the deferred first
    deferred.resolve(42);
    
    // Now attach a then handler - this triggers promiseDispatch on the already-resolved promise
    // In the mutated code, `if (true)` instead of `if (messages)` means it tries to push
    // to `messages` which is now `undefined` after resolution, causing incorrect behavior
    const result = await deferred.promise.then((value: number) => value * 2);
    
    expect(result).toBe(84);
  });
});