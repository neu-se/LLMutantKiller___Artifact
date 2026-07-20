import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString via long stack traces", () => {
  it("should correctly handle stack trace filtering without errors when longStackSupport is enabled", async () => {
    const originalLongStackSupport = (Q as any).longStackSupport;
    (Q as any).longStackSupport = true;

    try {
      const deferred = (Q as any).defer();

      // Create a chain that will trigger stack trace filtering
      const promise = (Q as any)()
        .then(() => {
          return (Q as any)();
        })
        .then(() => {
          throw new Error("intentional error to trigger stack filtering");
        });

      let rejectionReason: Error | null = null;

      await new Promise<void>((resolve) => {
        promise.catch((err: Error) => {
          rejectionReason = err;
          resolve();
        });
      });

      expect(rejectionReason).not.toBeNull();
      expect((rejectionReason as unknown as Error).message).toBe(
        "intentional error to trigger stack filtering"
      );
    } finally {
      (Q as any).longStackSupport = originalLongStackSupport;
    }
  });
});