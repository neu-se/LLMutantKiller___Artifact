import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with already-fulfilled promises", () => {
  it("should resolve synchronously-fulfilled promises without waiting for async resolution", async () => {
    // Create already-fulfilled promises
    const p1 = Q(1);
    const p2 = Q(2);
    const p3 = Q(3);

    // In the original code, if a promise is fulfilled (snapshot.state === "fulfilled"),
    // it replaces the promise in the array with its value synchronously.
    // In the mutated code (state !== "fulfilled"), fulfilled promises are treated
    // as pending, causing them to go through the async path unnecessarily.
    // The key observable difference: with the mutation, the result array values
    // would still be correct eventually, but the synchronous optimization is broken.
    // More critically, with the mutation, fulfilled promises are counted as pending
    // (pendingCount incremented), and the when() callback is called for them.
    // This means the final result should still be [1, 2, 3] in both cases,
    // but we can detect the mutation by checking that Q.all works correctly
    // with a mix of already-fulfilled promises.

    // The real observable difference: with the mutation, already-fulfilled promises
    // are treated as NOT fulfilled, so they go through the async `when()` path.
    // This means pendingCount gets incremented for them, and the deferred resolves
    // only when those async callbacks fire. The result should still be correct,
    // but let's verify the actual values are correct.

    // Actually, the mutation causes fulfilled promises to NOT be short-circuited,
    // meaning they go through `when()`. The `when()` path also works, so the
    // result is the same. BUT: if pendingCount === 0 check at the end fires
    // before any async callbacks, the deferred resolves with unfulfilled promise
    // objects instead of their values.

    // With the mutation: fulfilled promises are treated as "not fulfilled",
    // so pendingCount is incremented for each. The array still contains
    // the promise objects (not values) when `if (pendingCount === 0)` is checked.
    // The when() callbacks will eventually replace them, but the initial
    // `if (pendingCount === 0)` check won't fire (pendingCount > 0).
    // So the result will eventually be correct.

    // The real bug: with mutation, if ALL promises are already fulfilled,
    // pendingCount never reaches 0 via the decrement path... wait, it does
    // via the when() fulfilled callback. So the result is still correct.

    // Let me think differently: the mutation makes fulfilled promises go through
    // the else branch, incrementing pendingCount. The when() callback will
    // set promises[index] = value and decrement pendingCount. So it still works.
    // BUT: the initial `if (pendingCount === 0)` at the end won't fire.

    // For an empty array, pendingCount stays 0 and deferred resolves immediately.
    // For all-fulfilled promises with mutation, pendingCount > 0, resolved async.

    // The key difference: with original code, already-fulfilled promises are
    // replaced synchronously and pendingCount stays 0, so `if (pendingCount === 0)`
    // fires and resolves immediately. With mutation, it goes async.

    // We can detect this by checking if Q.all([Q(1), Q(2)]) resolves with correct values.
    const result = await Q.all([p1, p2, p3]).then((values: number[]) => values);
    expect(result).toEqual([1, 2, 3]);

    // More targeted test: with the mutation, the promises array passed to the
    // fulfilled callback contains the original promise objects, not values,
    // because the mutation causes fulfilled promises to go through when(),
    // which replaces them asynchronously. But since we await, both should work.

    // The real killer test: check that non-promise values mixed with fulfilled
    // promises work correctly. Non-promise values always go through when().
    // With mutation, fulfilled promises ALSO go through when(), so pendingCount
    // is correct. The result should be the same.

    // Actually the mutation IS detectable: with original, if snapshot.state === "fulfilled",
    // promises[index] = snapshot.value (sync replacement) and pendingCount stays 0.
    // With mutation (state !== "fulfilled" is true for "fulfilled" state... wait no.
    // "fulfilled" !== "fulfilled" is FALSE. So the condition is false, and we go to else,
    // incrementing pendingCount. So fulfilled promises are treated as pending!

    // This means: with mutation, Q.all([Q(1)]) will have pendingCount=1,
    // go through when(), and eventually resolve with [1]. Still correct but async.

    // For the test to FAIL with mutation, we need something that breaks.
    // What if we have a mix where the non-fulfilled path causes issues?

    // Actually with the mutation, the condition `(snapshot = promise.inspect()).state !== "fulfilled"`
    // is TRUE when state IS "fulfilled", so we enter the if block and do:
    // promises[index] = snapshot.value (which IS the fulfilled value!)
    // Wait - re-reading: the if block sets promises[index] = snapshot.value
    // The else block increments pendingCount and calls when().
    // With mutation (state !== "fulfilled"), when state IS "fulfilled":
    // condition is TRUE -> promises[index] = snapshot.value, pendingCount stays 0
    // when state is NOT "fulfilled" (pending/rejected):
    // condition is FALSE -> goes to else, increments pendingCount
    // This is BACKWARDS from original! Pending promises get short-circuited!

    // So with mutation, pending promises are treated as if they're fulfilled with undefined!
    const deferred = Q.defer<number>();
    const mixedResult = Q.all([Q(42), deferred.promise]);
    
    // With original: Q(42) is fulfilled -> short-circuit with value 42, pendingCount stays 0
    //                deferred.promise is pending -> pendingCount = 1, wait for resolution
    // With mutation: Q(42) is fulfilled -> condition (state !== "fulfilled") is FALSE
    //                -> goes to else, pendingCount = 1, when() called
    //                deferred.promise is pending -> condition (state !== "fulfilled") is TRUE
    //                -> promises[1] = undefined (snapshot.value for pending is undefined)
    //                -> pendingCount stays 0... wait, but then if(pendingCount===0) fires!
    //                -> deferred resolves with [Q(42)_promise_object, undefined]!

    // With mutation, pending promises get short-circuited with undefined value,
    // causing Q.all to resolve immediately with wrong values!
    deferred.resolve(99);
    
    const finalResult = await mixedResult;
    expect(finalResult).toEqual([42, 99]);
  });
});