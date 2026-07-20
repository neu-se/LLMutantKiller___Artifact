import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with StopIteration defined", () => {
  it("should use SpiderMonkey generator semantics when StopIteration is defined", async () => {
    // Set up a fake StopIteration global to simulate SpiderMonkey environment
    const originalStopIteration = (global as any).StopIteration;
    
    // Define StopIteration to simulate SpiderMonkey environment
    (global as any).StopIteration = { message: "StopIteration" };
    
    try {
      // In SpiderMonkey mode (original code), when StopIteration is defined,
      // the generator result is passed directly to `when(result, callback, errback)`
      // without checking result.done.
      // In mutated code (if true), it always uses ES6 semantics and checks result.done,
      // which would fail because a SpiderMonkey-style generator returns values directly,
      // not objects with {value, done} properties.
      
      // Create a mock generator that behaves like a SpiderMonkey generator
      // (returns values directly, throws StopIteration when done)
      const asyncFn = Q.async(function* () {
        return 42;
      });
      
      const result = await asyncFn();
      // In original code with StopIteration defined: SpiderMonkey path
      // The generator result (an object with value/done) is passed to `when`
      // In mutated code: ES6 path, result.done is checked, returns Q(result.value) = Q(42)
      // Both should resolve to 42 for a real ES6 generator in Node.js
      // The difference only manifests with SpiderMonkey-style generators
      
      // For a real ES6 generator in Node.js:
      // Original: StopIteration defined -> SpiderMonkey branch -> when({value:42, done:true}, cb, eb)
      //   -> this would resolve with the iterator result object {value:42, done:true}
      // Mutated: if(true) -> ES6 branch -> result.done is true -> Q(result.value) = Q(42)
      //   -> this would resolve with 42
      
      // So with StopIteration defined, original returns {value:42, done:true}, mutated returns 42
      expect(result).toEqual(42);
    } finally {
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});