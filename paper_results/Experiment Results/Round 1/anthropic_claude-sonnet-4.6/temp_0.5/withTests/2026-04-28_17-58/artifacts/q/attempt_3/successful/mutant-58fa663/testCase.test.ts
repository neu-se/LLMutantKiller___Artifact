import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("should not call process.emit when process.emit is not a function", done => {
    Q.resetUnhandledRejections();

    const originalEmit = process.emit;
    const unhandledRejectionPromises: any[] = [];
    
    // Use real emit to capture unhandledRejection, then remove emit
    const trackingEmit = function(this: any, event: string, ...args: any[]) {
      if (event === "unhandledRejection") {
        unhandledRejectionPromises.push(args[1]);
      }
      return originalEmit.apply(this, [event, ...args] as any);
    };
    (process as any).emit = trackingEmit;

    const errors: Error[] = [];
    const handler = (err: Error) => { errors.push(err); };
    process.on("uncaughtException", handler);

    const p = Q.reject(new Error("test rejection"));

    // Wait for unhandledRejection to be emitted
    setTimeout(() => {
      expect(unhandledRejectionPromises.length).toBeGreaterThan(0);
      
      // Now make process.emit not a function
      (process as any).emit = undefined;

      // Handle the rejection - triggers untrackRejection
      // Since promise was reported, runAfter will try to call process.emit("rejectionHandled")
      // Original (&&): typeof process === "object" (true) && typeof undefined === "function" (false) => skip
      // Mutated (||): typeof process === "object" (true) || ... => enter block, call undefined() => TypeError
      p.fail(() => "handled");

      setTimeout(() => {
        process.emit = originalEmit;
        process.removeListener("uncaughtException", handler);
        expect(errors.length).toBe(0);
        done();
      }, 300);
    }, 200);
  });
});