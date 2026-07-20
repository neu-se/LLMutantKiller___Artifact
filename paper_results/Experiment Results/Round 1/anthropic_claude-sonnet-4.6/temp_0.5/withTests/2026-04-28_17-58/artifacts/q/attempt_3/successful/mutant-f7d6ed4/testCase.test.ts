import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done domain handling", () => {
  it("should not throw synchronously when called outside a domain", () => {
    const q = Q as any;
    const originalOnerror = q.onerror;

    // Suppress unhandled rejection errors
    q.onerror = function () {};

    let threw = false;
    let thrownError: any = null;

    try {
      // In the mutated code, the condition becomes:
      //   (typeof process === "object" && process) || process.domain
      // which is always truthy in Node.js (since `process` is truthy),
      // so it tries to call process.domain.bind(...) where process.domain is null,
      // throwing: TypeError: Cannot read property 'bind' of null
      q.fulfill(42).done();
    } catch (e) {
      threw = true;
      thrownError = e;
    } finally {
      q.onerror = originalOnerror;
    }

    // Original code: condition is false when process.domain is null, no throw
    // Mutated code: condition is true, tries null.bind(...), throws TypeError
    expect(threw).toBe(false);
  });
});