import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("should update __minimumStackCounter__ to lower counter when source chain has older promise", (done) => {
    Q.longStackSupport = true;

    const d1 = Q.defer(); // created first → lower stackCounter (C1)
    const d2 = Q.defer(); // created second → higher stackCounter (C2)

    const d1Counter = (d1.promise as any).stackCounter;
    const d2Counter = (d2.promise as any).stackCounter;

    // Sanity: d1 was created before d2
    // d1Counter < d2Counter

    // d2.promise.source = d1.promise (older promise with lower counter)
    d2.resolve(d1.promise);
    d1.reject(new Error("test"));

    d2.promise.then(null, function(e: any) {
      Q.longStackSupport = false;
      try {
        // With original code:
        //   Walk d2.promise (C2): set __minimumStackCounter__ = C2
        //   Walk d1.promise (C1): C2 > C1 → update __minimumStackCounter__ = C1
        //   Final: __minimumStackCounter__ = C1 = d1Counter
        //
        // With mutated code:
        //   Walk d2.promise (C2): set __minimumStackCounter__ = C2
        //   Walk d1.promise (C1): condition is false → skip
        //   Final: __minimumStackCounter__ = C2 = d2Counter
        
        expect(d1Counter).toBeLessThan(d2Counter); // verify setup
        expect(e.__minimumStackCounter__).toBe(d1Counter); // original: updated to C1
        done();
      } catch (ex) {
        done(ex);
      }
    });
  });
});