import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should not throw when process.domain is null/undefined (no active domain)", async () => {
    // In Node.js, process.domain is null when not inside a domain
    // The original code checks: typeof process === "object" && process && process.domain
    // The mutated code checks: typeof process === "object" && process || process.domain
    // In the mutated version, since (typeof process === "object" && process) is always true in Node.js,
    // the if block always executes, trying to call process.domain.bind() which throws when process.domain is null

    let errorThrown: Error | null = null;

    // Ensure we're not in a domain context
    if (process.domain) {
      // Skip this test if somehow we're already in a domain
      return;
    }

    try {
      // Call done() on a resolved promise - this should work without error
      // in the original code but will throw in the mutated code because
      // process.domain is null and the mutated condition always enters the if block
      const promise = Q.resolve(42);
      promise.done();
      
      // Wait for async operations to complete
      await new Promise<void>((resolve) => setTimeout(resolve, 50));
    } catch (e) {
      errorThrown = e as Error;
    }

    expect(errorThrown).toBeNull();
  });
});