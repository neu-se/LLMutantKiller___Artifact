import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection && vs || mutation", () => {
  it("handles rejection without error when process is not an object", () => {
    Q.resetUnhandledRejections();

    const originalProcess = global.process;

    const error = new Error("test");
    const rejected = Q.reject(error);

    // Set process to a string: typeof "string" === "string", not "object"
    // Original (&&): false && ... => false, no emit call, safe
    // Mutated (||): false || typeof "string".emit === "function" => typeof undefined === "function" => false, safe too
    // Need process to be something where .emit access throws
    // Use a Proxy that throws on property access
    (global as any).process = new Proxy({}, {
      get(target, prop) {
        if (prop === 'toString') return () => "[object NotProcess]";
        throw new Error("should not access process properties");
      },
      has() { return false; }
    });

    let threw = false;
    try {
      rejected.fail(function () {});
    } catch(e) {
      threw = true;
    } finally {
      global.process = originalProcess;
    }

    expect(threw).toBe(false);
  });
});