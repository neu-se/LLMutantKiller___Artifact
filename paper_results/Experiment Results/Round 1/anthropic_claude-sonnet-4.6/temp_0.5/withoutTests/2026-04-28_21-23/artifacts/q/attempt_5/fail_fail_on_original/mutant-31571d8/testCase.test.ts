import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("should update __minimumStackCounter__ to the smallest stackCounter seen", (done) => {
    Q.longStackSupport = true;

    // Create two promises manually with known stackCounters
    // The error's __minimumStackCounter__ should end up as the smallest value
    // Original: updates __minimumStackCounter__ when p.stackCounter < current minimum
    // Mutation: never updates after the first set (condition is always false after first)

    const d1 = Q.defer();
    const d2 = Q.defer();

    // p2 depends on p1, so p1 has lower stackCounter (created first)
    const p1 = d1.promise;
    const p2 = d2.promise;

    // chain: p2's source will be p1
    const chain = p1.then(function() {
      return p2;
    }).then(function() {
      throw new Error("test");
    });

    chain.fail(function(err: any) {
      try {
        // With original: __minimumStackCounter__ is set to the SMALLEST stackCounter
        // (the oldest promise in the chain)
        // With mutation: __minimumStackCounter__ is set to the FIRST promise's counter
        // (the newest), and never updated
        // The difference: original sets it to a smaller value than mutation
        const minCounter = (err as any).__minimumStackCounter__;
        expect(typeof minCounter).toBe("number");
        // p1 has a lower stackCounter than p2 (created first)
        // Original walks the full chain and sets minimum to p1's counter
        // Mutation stops after p2 and keeps p2's (higher) counter
        // p1.stackCounter should be less than p2.stackCounter
        expect(minCounter).toBeLessThan((p2 as any).stackCounter);
        done();
      } catch(e) {
        done(e);
      }
    });

    d1.resolve(1);
    d2.resolve(2);
  });
});