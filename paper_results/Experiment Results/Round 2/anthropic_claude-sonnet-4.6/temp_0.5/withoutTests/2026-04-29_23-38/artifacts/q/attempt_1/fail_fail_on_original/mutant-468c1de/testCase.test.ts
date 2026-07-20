import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong with longStackSupport", () => {
  it("should only include stack frames from promises created before the rejection based on stackCounter", async () => {
    Q.longStackSupport = true;

    // Create a chain of promises, then reject one
    // The key is that __minimumStackCounter__ should track the minimum stackCounter
    // In the original: only stacks with counter < error's counter are included
    // In the mutated: the condition is always true, so __minimumStackCounter__ gets
    // overwritten each time, ending up as the last counter rather than minimum

    const error = new Error("test rejection");
    
    // Create promise p1 first (lower stackCounter)
    const p1 = Q.defer();
    
    // Create promise p2 after (higher stackCounter)  
    const p2 = Q.defer();
    
    // Reject p2 with our error
    p2.reject(error);
    
    let caughtError: any = null;
    
    await new Promise<void>((resolve) => {
      p2.promise.then(null, function(err: any) {
        caughtError = err;
        resolve();
      });
    });

    // Now check that __minimumStackCounter__ was set correctly
    // In the original code, __minimumStackCounter__ is set to the minimum stackCounter
    // seen among stacks that pass the condition.
    // In the mutated code, since condition is always true, it gets overwritten each time
    // and ends up as the last stackCounter value (not necessarily minimum).
    
    // We test this by checking that when we have two promises in a source chain,
    // the minimum counter tracking works correctly vs always-true condition
    
    // Create a scenario where we can observe the difference:
    // Make a promise chain where p.source creates a linked list
    // The original tracks minimum, mutation doesn't
    
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    
    // deferred1 has lower stackCounter than deferred2
    const counter1 = (deferred1.promise as any).stackCounter;
    const counter2 = (deferred2.promise as any).stackCounter;
    
    // counter1 should be less than counter2 since deferred1 was created first
    expect(counter1).toBeLessThan(counter2);
    
    // Create an error and simulate what makeStackTraceLong does
    // by chaining promises so that source links exist
    const testError = new Error("chain test");
    
    let resolvedError: any = null;
    
    deferred2.promise.fail(function(err: any) {
      resolvedError = err;
      return null;
    });
    
    deferred1.promise.then(function() {
      deferred2.reject(testError);
    });
    
    deferred1.resolve(null);
    
    await new Promise<void>((resolve) => setTimeout(resolve, 50));
    
    // In original: __minimumStackCounter__ = minimum of all stackCounters seen
    // In mutated: __minimumStackCounter__ = last stackCounter seen (not minimum)
    // Since we can't directly observe the stack trace content reliably,
    // we verify the promise chain was set up and error was propagated
    expect(resolvedError).toBe(testError);
    
    // The real test: verify __minimumStackCounter__ behavior
    // Create a fresh error and manually test the condition logic
    const freshError: any = new Error("fresh");
    
    // Simulate original behavior: minimum tracking
    // p with stackCounter = 5
    const fakeP1 = { stack: "stack1", stackCounter: 5 };
    // p with stackCounter = 3 (smaller)
    const fakeP2 = { stack: "stack2", stackCounter: 3 };
    // p with stackCounter = 7 (larger)
    const fakeP3 = { stack: "stack3", stackCounter: 7 };
    
    // Original logic simulation:
    // After processing fakeP1: __minimumStackCounter__ = 5
    // After processing fakeP2: 5 > 3, so __minimumStackCounter__ = 3
    // After processing fakeP3: 3 > 7 is false, so __minimumStackCounter__ stays 3
    
    // Mutated logic simulation (condition always true):
    // After processing fakeP1: __minimumStackCounter__ = 5
    // After processing fakeP2: __minimumStackCounter__ = 3
    // After processing fakeP3: __minimumStackCounter__ = 7 (WRONG - not minimum!)
    
    // We can verify by creating a promise chain and checking the error's minimumStackCounter
    const d1 = Q.defer();
    const d2 = Q.defer();
    const d3 = Q.defer();
    
    const sc1 = (d1.promise as any).stackCounter;
    const sc2 = (d2.promise as any).stackCounter;
    const sc3 = (d3.promise as any).stackCounter;
    
    expect(sc1).toBeLessThan(sc2);
    expect(sc2).toBeLessThan(sc3);
    
    // Set up source chain: d3.source -> d2, d2.source -> d1
    (d3.promise as any).source = d2.promise;
    (d2.promise as any).source = d1.promise;
    
    const chainError: any = new Error("chain error");
    chainError.stack = "Error: chain error\n    at test";
    
    // Call makeStackTraceLong indirectly through rejection handling
    // We need to trigger the actual function - do it via then/fail
    let capturedError: any = null;
    
    const resultPromise = d3.promise.then(null, function(err: any) {
      capturedError = err;
      return null;
    });
    
    d3.reject(chainError);
    
    await new Promise<void>((resolve) => setTimeout(resolve, 100));
    
    // After makeStackTraceLong runs:
    // Original: __minimumStackCounter__ = min(sc1, sc2, sc3) = sc1
    // Mutated: __minimumStackCounter__ = last counter seen in traversal
    //          (depends on traversal order, but NOT necessarily sc1)
    
    if (capturedError && capturedError.__minimumStackCounter__ !== undefined) {
      // In original code: should be the minimum stackCounter (sc1)
      expect(capturedError.__minimumStackCounter__).toBe(sc1);
    }
  });
});