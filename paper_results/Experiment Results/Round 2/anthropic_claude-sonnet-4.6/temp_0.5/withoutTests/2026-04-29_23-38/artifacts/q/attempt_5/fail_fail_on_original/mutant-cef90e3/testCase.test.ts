import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then - done flag prevents double callback invocation", () => {
  it("rejected callback should not be called more than once even when notified multiple times", async () => {
    const d = Q.defer();
    let rejectedCallCount = 0;

    d.promise.then(
      null,
      (_e: any) => {
        rejectedCallCount++;
        return 42;
      }
    );

    // Wait for the rejection handler to be registered in progressListeners
    // (it's registered inside Q.nextTick in the then() implementation)
    await new Promise<void>((resolve) => Q.nextTick(resolve));

    // Notify twice before resolving - both notifications will invoke the rejection handler
    // First: done=false -> done=true, count++
    // Second: done=true -> original returns early (count stays), mutated calls count++ again
    d.notify(1);
    d.notify(2);

    // Wait for the notification callbacks to process
    await new Promise<void>((resolve) => Q.nextTick(resolve));
    await new Promise<void>((resolve) => Q.nextTick(resolve));

    // Original: rejectedCallCount = 1 (second notification returns early due to done flag)
    // Mutated: rejectedCallCount = 2 (done flag check has no return, callback called twice)
    expect(rejectedCallCount).toBe(1);
  });
});