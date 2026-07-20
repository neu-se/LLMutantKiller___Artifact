import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("does not emit unhandledRejection for a promise at index 1 when using mutated condition", (done) => {
    Q.resetUnhandledRejections();

    const emittedPromises: any[] = [];

    const originalEmit = process.emit;
    (process as any).emit = function(event: string, reason: any, promise: any) {
      if (event === "unhandledRejection") {
        emittedPromises.push(promise);
      }
      return originalEmit.apply(process, arguments as any);
    };

    const e1 = new Error("first");
    const e2 = new Error("second");
    const p1 = Q.reject(e1);
    const p2 = Q.reject(e2);

    // p1 is at index 0, p2 is at index 1 in unhandledRejections
    // Original: both !== -1 → both emitted
    // Mutant: p1 at index 0 (0 !== 1 = true → emitted), p2 at index 1 (1 !== 1 = false → NOT emitted)

    setTimeout(() => {
      (process as any).emit = originalEmit;
      p1.fail(() => {});
      p2.fail(() => {});
      Q.resetUnhandledRejections();

      expect(emittedPromises.length).toBe(2);
      expect(emittedPromises).toContain(p1);
      expect(emittedPromises).toContain(p2);
      done();
    }, 200);
  });
});