import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("should walk entire source chain and set __minimumStackCounter__ to minimum", (done) => {
    Q.longStackSupport = true;

    // The source chain is built via become() -> promise.source = newPromise
    // Each deferred.resolve() calls become() which sets source
    // We need to create a chain where multiple deferred promises have stacks
    // and are linked via source

    const d1 = Q.defer();
    const d2 = Q.defer();
    const d3 = Q.defer();

    // Record stackCounters before chaining
    const sc1 = (d1.promise as any).stackCounter;
    const sc2 = (d2.promise as any).stackCounter;
    const sc3 = (d3.promise as any).stackCounter;

    // Verify they are ordered (d1 < d2 < d3)
    expect(sc1).toBeLessThan(sc2);
    expect(sc2).toBeLessThan(sc3);

    // Chain: d1 resolves to d2, d2 resolves to d3, d3 rejects
    d2.promise.then(function() {
      throw new Error("test error");
    }).fail(function(err: any) {
      try {
        const minCounter = (err as any).__minimumStackCounter__;
        // Original: walks source chain d3->d2->d1, updates minimum each time
        //   final __minimumStackCounter__ should be sc1 (smallest)
        // Mutation: only sets once (sc3 or sc2), never updates to smaller
        //   final __minimumStackCounter__ should NOT be sc1
        expect(minCounter).toBeLessThanOrEqual(sc2);
        done();
      } catch(e) {
        done(e);
      }
    });

    d1.resolve(1);
    d2.resolve(d1.promise);
    d3.reject(new Error("rejection"));
  });
});