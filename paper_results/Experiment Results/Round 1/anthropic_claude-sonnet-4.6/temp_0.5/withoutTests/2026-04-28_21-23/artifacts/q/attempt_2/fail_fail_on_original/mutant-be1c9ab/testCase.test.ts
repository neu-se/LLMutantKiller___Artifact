import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("Q.async with Q.return should resolve (not reject) when QReturnValue is thrown", async () => {
    // Force the SpiderMonkey path by defining StopIteration globally
    (global as any).StopIteration = {};
    
    // Create a fake generator that throws a QReturnValue when .next() is called
    // Q["return"](value) throws new QReturnValue(value)
    // In the SpiderMonkey path, isStopIteration is called on the caught exception
    // Original (||): QReturnValue instanceof QReturnValue => true => resolves with exception.value
    // Mutated (&&): QReturnValue toString != "[object StopIteration]" => false => rejects
    
    try {
      const asyncFn = Q.async(function() {
        // This is a SpiderMonkey-style "generator" - just a plain function
        // Q["return"](42) throws QReturnValue(42)
        Q["return"](42);
      });
      
      const result = await asyncFn();
      expect(result).toBe(42);
    } finally {
      delete (global as any).StopIteration;
    }
  });
});