import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("sets __minimumStackCounter__ to the lowest counter in the source chain", (done) => {
    (Q as any).longStackSupport = true;

    // Create d0 first (lower stackCounter), then d1 (higher stackCounter)
    // Resolve d1 with d0.promise so d1.promise.source = d0.promise
    // makeStackTraceLong(err, d1.promise):
    //   p=d1.promise: counter=HIGH, set __minimumStackCounter__=HIGH
    //   p=d0.promise: counter=LOW
    //     original: HIGH > LOW -> update __minimumStackCounter__=LOW
    //     mutated:  false -> do NOT update, stays HIGH
    //
    // Observable: error.__minimumStackCounter__ === d0.promise.stackCounter (original)
    //          vs error.__minimumStackCounter__ === d1.promise.stackCounter (mutated)

    const d0 = (Q as any).defer();
    const d1 = (Q as any).defer();

    // Capture the stackCounters
    const d0Counter = d0.promise.stackCounter;
    const d1Counter = d1.promise.stackCounter;

    // d1 resolves to d0's promise -> source chain: d1.promise -> d0.promise
    d1.resolve(d0.promise);

    d1.promise.fail(function(err: any) {
      try {
        (Q as any).longStackSupport = false;
        // Original: __minimumStackCounter__ = d0Counter (lower value)
        // Mutated:  __minimumStackCounter__ = d1Counter (higher value, first encountered)
        expect(err.__minimumStackCounter__).toBe(d0Counter);
        done();
      } catch(e) {
        (Q as any).longStackSupport = false;
        done(e);
      }
    });

    d0.reject(new Error("test"));
  });
});