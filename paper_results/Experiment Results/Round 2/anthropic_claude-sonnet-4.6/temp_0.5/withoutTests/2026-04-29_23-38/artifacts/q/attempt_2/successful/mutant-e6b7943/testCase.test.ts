import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("should reject when a regular error is thrown in a generator (SpiderMonkey path)", async () => {
    // Set StopIteration globally to trigger the SpiderMonkey path in Q.async
    (global as any).StopIteration = {};
    
    try {
      const asyncFn = Q.async(function* () {
        throw new Error("real error");
      });
      
      const result = await asyncFn().then(
        () => "fulfilled",
        (err: Error) => "rejected: " + err.message
      );
      
      // Original: isStopIteration returns false for regular Error -> rejects
      // Mutated: isStopIteration returns true -> treats as stop iteration -> fulfills with undefined
      expect(result).toBe("rejected: real error");
    } finally {
      delete (global as any).StopIteration;
    }
  });
});