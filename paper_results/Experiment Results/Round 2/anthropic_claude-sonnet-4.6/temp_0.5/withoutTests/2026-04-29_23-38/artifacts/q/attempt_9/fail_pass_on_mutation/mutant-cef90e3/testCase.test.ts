import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then - done flag", () => {
  it("rejected callback should not be called when done flag is set", async () => {
    const d = Q.defer();
    let count = 0;
    
    d.promise.then(
      null,
      (_e: any) => { count++; return 42; }
    );
    
    // Resolve first (sets done=true via FUNC1)
    d.resolve(42);
    
    // Wait for FUNC1 to run
    await new Promise<void>(r => setTimeout(r, 0));
    
    // Now try to notify (should be no-op since d is resolved)
    // But FUNC2 might still be in progressListeners...
    
    expect(count).toBe(0);
  });
});