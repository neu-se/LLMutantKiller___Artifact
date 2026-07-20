import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should not throw synchronously when calling done() with no active process domain", () => {
    // In Node.js test environments, process.domain is typically null (no active domain)
    // Original code: typeof process === "object" && process && process.domain
    //   -> false when process.domain is null, so process.domain.bind() is never called
    // Mutated code: typeof process === "object" || process && process.domain
    //   -> always true in Node.js, so process.domain.bind() is called even when process.domain is null
    //   -> this throws: TypeError: Cannot read properties of null (reading 'bind')
    
    // Verify no active domain exists (this is the normal test environment state)
    expect((process as any).domain).toBeFalsy();
    
    // This should not throw in the original code
    // In the mutated code, it will throw TypeError because process.domain is null
    expect(() => {
      Q.resolve(42).done();
    }).not.toThrow();
  });
});