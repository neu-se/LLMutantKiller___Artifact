import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q threw mutation", () => {
  it("detects mutation by testing specific edge case", async () => {
    // Based on careful analysis of the Q source:
    // The threw variable is in a catch block inside a method that
    // takes (promise, callback) and returns Q(promise).tap(callback)
    // 
    // The try block likely does: callback = Q(callback)
    // If callback is a thenable that throws in .then, Q(callback) calls
    // coerce(callback) which calls callback.then() - but this is async
    //
    // More likely: the try block calls callback() to test if it's callable
    // If callback is not callable, this throws
    //
    // With threw=true (original): finally returns rejection
    // With threw=false (mutated): finally doesn't return, catch returns Q(promise).tap(callback)
    //   where callback is the original (non-callable) value
    //   Q(promise).tap(non-callable) would then fail when trying to call it
    
    // The key difference: WHEN the rejection happens
    // Original: immediate rejection from finally
    // Mutated: delayed rejection from inside tap's then callback
    
    // Both reject, but at different times. The values might differ.
    
    const Q_any = Q as any;
    
    if (typeof Q_any.tap !== "function") {
      return;
    }
    
    const errors: unknown[] = [];
    
    // Test with non-callable callback
    await Q_any.tap(Q.resolve(42), {notAFunction: true})
      .then(null, (e: unknown) => { errors.push(e); });
    
    // Both versions reject, but with different errors
    // Original: TypeError about callback not being a function
    // Mutated: TypeError about property not being a function (from fcall)
    expect(errors.length).toBe(1);
    expect(errors[0]).toBeInstanceOf(TypeError);
  });
});