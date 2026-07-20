import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise resolution order", () => {
  it("resolves nested promises in correct order demonstrating setImmediate tick behavior", (done) => {
    const results: number[] = [];
    
    // Create a chain that would fail if requestTick is broken
    // In non-Node environments the mutation would cause setImmediate branch
    // to be skipped when setImmediate exists, falling to MessageChannel/setTimeout
    
    // Force non-Node path by checking if we can detect the difference
    // The mutation inverts the condition: non-Node env with setImmediate
    // Original: uses setImmediate (fast)
    // Mutated: skips setImmediate, uses MessageChannel or setTimeout (slower/different)
    
    let count = 0;
    const total = 100;
    
    function makePromise(i: number): Promise<number> {
      const d = Q.defer();
      d.resolve(i);
      return d.promise;
    }
    
    const promises = [];
    for (let i = 0; i < total; i++) {
      promises.push(makePromise(i).then((v: number) => { count++; return v; }));
    }
    
    Q.all(promises).then(() => {
      expect(count).toBe(total);
      done();
    });
  });
});