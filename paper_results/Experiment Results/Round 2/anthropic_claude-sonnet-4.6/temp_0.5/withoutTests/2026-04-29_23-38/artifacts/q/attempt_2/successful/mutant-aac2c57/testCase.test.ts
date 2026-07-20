import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should not throw synchronously when called on a resolved promise without an active domain", () => {
    // In Node.js, process.domain is null when not in a domain context.
    // Original code: typeof process === "object" && process && process.domain
    //   -> false when process.domain is null, so no attempt to call process.domain.bind()
    // Mutated code: typeof process === "object" || process && process.domain
    //   -> always true in Node.js, so it tries process.domain.bind() which throws
    //      TypeError: Cannot read properties of null (reading 'bind')
    
    // Verify we're not in a domain (if we are, both versions behave the same)
    expect((process as any).domain).toBeFalsy();
    
    // This should not throw synchronously in the original code
    expect(() => {
      Q.resolve(42).done();
    }).not.toThrow();
  });
});