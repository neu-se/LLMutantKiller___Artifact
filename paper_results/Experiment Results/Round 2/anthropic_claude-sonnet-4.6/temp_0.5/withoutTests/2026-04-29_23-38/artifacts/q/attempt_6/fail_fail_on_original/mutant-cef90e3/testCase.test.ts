import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done flag", () => {
  it("rejected callback should not be called more than once", async () => {
    const d = Q.defer();
    let count = 0;
    
    d.promise.then(null, (_e: any) => { count++; return 42; });
    
    // Wait for FUNC2 to be registered in progressListeners
    await new Promise<void>(r => Q.nextTick(r));
    
    // Notify twice
    d.notify(1);
    d.notify(2);
    
    // Wait for notifications to be processed (they're async via Q.nextTick)
    await new Promise<void>(r => Q.nextTick(r));
    await new Promise<void>(r => Q.nextTick(r));
    await new Promise<void>(r => Q.nextTick(r));
    
    expect(count).toBe(1);
  });
});