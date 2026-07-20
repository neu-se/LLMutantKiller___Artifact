import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("should update stack when error propagates to an older promise context", (done) => {
    Q.longStackSupport = true;

    // Create two promise contexts where p1 is OLDER (lower stackCounter) than p2
    const p1 = Q.defer(); // created first, lower stackCounter
    const p2 = Q.defer(); // created second, higher stackCounter

    const sc1 = (p1.promise as any).stackCounter;
    const sc2 = (p2.promise as any).stackCounter;

    // p2 rejects first, setting __minimumStackCounter__ to sc2 on the error
    // Then the same error propagates to p1's context (older, sc1 < sc2)
    // Original: sc2 > sc1 → TRUE → adds p1's stack, updates minimum to sc1
    // Mutation: condition is false → does NOT add p1's stack

    // We simulate this by having p1 resolve to p2, then p2 rejects
    // makeStackTraceLong is called with self=p1.promise (older)
    // after __minimumStackCounter__ was set from p2's context

    const error = new Error("test error");
    // Manually set __minimumStackCounter__ to sc2 on the error
    // to simulate it having been processed by a newer promise already
    Object.defineProperty(error, "__minimumStackCounter__", {
      value: sc2,
      configurable: true
    });

    // Now trigger makeStackTraceLong with p1.promise (which has sc1 < sc2)
    // by rejecting through p1's context
    p1.promise.then(function() {
      throw error;
    }).fail(function(err: any) {
      try {
        // Original: since sc2 > sc1, adds p1.promise's stack, updates minimum to sc1
        // Mutation: condition false, minimum stays sc2
        expect((err as any).__minimumStackCounter__).toBe(sc1);
        done();
      } catch(e) {
        done(e);
      }
    });

    p1.resolve(1);
  });
});