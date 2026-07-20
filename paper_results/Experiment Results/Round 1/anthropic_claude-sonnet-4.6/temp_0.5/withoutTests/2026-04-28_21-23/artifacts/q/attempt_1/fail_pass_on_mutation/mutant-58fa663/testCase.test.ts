import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("should not throw when process.emit is not a function and a rejection is handled", async () => {
    const originalEmit = process.emit;
    (process as any).emit = undefined;

    let error: Error | null = null;
    try {
      const deferred = Q.defer();
      deferred.reject(new Error("test rejection"));
      await new Promise<void>((resolve) => {
        deferred.promise.fail(() => {}).then(() => resolve());
        setTimeout(resolve, 200);
      });
    } catch (e) {
      error = e as Error;
    } finally {
      process.emit = originalEmit;
    }

    expect(error).toBeNull();
  });
});