import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("should set __minimumStackCounter__ to the oldest promise stackCounter in the chain", (done) => {
    Q.longStackSupport = true;

    const d1 = Q.defer();
    const d2 = Q.defer();

    const p1 = d1.promise; // created first, lower stackCounter
    const p2 = d2.promise; // created second, higher stackCounter

    // p2 source will link back to p1 through the chain
    const chain = p1.then(function() {
      return p2;
    }).then(function() {
      throw new Error("test");
    });

    chain.fail(function(err: any) {
      try {
        const minCounter = (err as any).__minimumStackCounter__;
        // Original: walks full source chain, updates __minimumStackCounter__ 
        //   when p.stackCounter < current minimum → ends at smallest (oldest) counter
        // Mutation: only sets __minimumStackCounter__ once (first iteration),
        //   never updates → stays at first (newest/highest) counter
        // p1 has lower stackCounter than p2
        // Original should set minCounter to p1's stackCounter (smaller value)
        // Mutation should keep minCounter at the first promise's stackCounter (larger value)
        expect(minCounter).toBe((p1 as any).stackCounter);
        done();
      } catch(e) {
        done(e);
      }
    });

    d1.resolve(1);
    d2.resolve(2);
  });
});