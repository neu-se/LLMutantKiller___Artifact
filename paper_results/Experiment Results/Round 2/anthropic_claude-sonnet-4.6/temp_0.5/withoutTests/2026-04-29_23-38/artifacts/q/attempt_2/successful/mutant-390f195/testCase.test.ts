import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong stack counter limiting", () => {
  it("should limit stack concatenation so the same promise stacks are not included multiple times", async () => {
    Q.longStackSupport = true;

    // We need to trigger makeStackTraceLong multiple times on the same error
    // by having the error propagate through multiple rejection handlers.
    // Each rejection handler calls makeStackTraceLong(exception, self) where
    // self is the promise that has a .source chain.
    //
    // With the original code: __minimumStackCounter__ is set so stacks
    // already counted are skipped on subsequent calls.
    // With the mutation: __minimumStackCounter__ is always undefined,
    // so ALL stacks are included every time, producing more separators.

    const d1 = Q.defer();
    const d2 = Q.defer();
    const d3 = Q.defer();

    // Resolve d2 and d3 to create promises with stack counters
    d2.resolve("x");
    d3.resolve("y");

    // Build a long chain to accumulate many promise stack frames
    let p: any = d1.promise;
    for (let i = 0; i < 5; i++) {
      p = p.then(function passThrough(v: any) { return v; });
    }

    let capturedStack1: string = "";
    let capturedStack2: string = "";

    // First rejection handler captures the stack, then rethrows
    const intermediate = p.then(null, function firstHandler(err: Error) {
      capturedStack1 = err.stack || "";
      throw err;
    });

    // Second rejection handler captures the stack after second makeStackTraceLong call
    const final = intermediate.then(null, function secondHandler(err: Error) {
      capturedStack2 = err.stack || "";
      return "done";
    });

    d1.reject(new Error("test error"));

    await final;

    const separator = "From previous event:";
    const count1 = capturedStack1.split(separator).length - 1;
    const count2 = capturedStack2.split(separator).length - 1;

    // With original code: count2 should equal count1 (no new stacks added
    // because __minimumStackCounter__ prevents re-including already-counted stacks)
    // With mutated code: count2 > count1 (stacks are re-included because
    // __minimumStackCounter__ is never properly set)
    expect(count2).toBe(count1);
  });
});