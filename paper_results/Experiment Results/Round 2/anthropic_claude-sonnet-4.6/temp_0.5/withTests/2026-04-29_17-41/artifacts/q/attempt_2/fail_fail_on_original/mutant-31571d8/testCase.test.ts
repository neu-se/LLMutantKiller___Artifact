import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces stack counter comparison", () => {
  it("should include stack frames from all promises earlier in the chain, not just the first one found", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Build a chain of 4 promise hops so there are multiple source links
      // with different stackCounters. The original code uses
      // `error.__minimumStackCounter__ > p.stackCounter` to keep adding
      // stacks from earlier promises. The mutated code uses `false` so
      // once __minimumStackCounter__ is set, no more stacks are appended.
      function hop4(): Q.Promise<never> {
        return Q.reject(new Error("deep error"));
      }

      function hop3(): Q.Promise<never> {
        return hop4();
      }

      function hop2(): Q.Promise<never> {
        return hop3().then(function hop2then() {
          return Q.resolve(1) as any;
        });
      }

      function hop1(): Q.Promise<never> {
        return hop2().then(function hop1then() {
          return Q.resolve(2) as any;
        });
      }

      function hop0(): Q.Promise<never> {
        return hop1().then(function hop0then() {
          return Q.resolve(3) as any;
        });
      }

      let capturedError: Error | null = null;

      await new Promise<void>((resolve) => {
        hop0().then(null, function(err: Error) {
          capturedError = err;
          resolve();
        });
      });

      expect(capturedError).not.toBeNull();
      const stack = capturedError!.stack || "";
      const separatorCount = (stack.match(/From previous event:/g) || []).length;

      // With the original code, the condition `error.__minimumStackCounter__ > p.stackCounter`
      // allows walking back through multiple source promises and collecting
      // multiple "From previous event:" sections.
      // With the mutated code (`false`), once __minimumStackCounter__ is set on
      // the first iteration that matches, subsequent iterations with lower
      // stackCounters are skipped, resulting in fewer separators.
      // We expect at least 2 separators with the original code (3 hops with .then).
      expect(separatorCount).toBeGreaterThanOrEqual(2);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});