import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection process.emit", () => {
  it("emits unhandledRejection for a promise that is in the unhandledRejections list", (done) => {
    Q.resetUnhandledRejections();

    const originalEmit = process.emit.bind(process);
    const emittedEvents: string[] = [];

    // Temporarily make process.emit trackable and patch the typeof check
    // by overriding process.emit as a non-function temporarily during trackRejection
    // then restoring it for the runAfter callback

    const originalEmitFn = process.emit;

    // We need two rejections so the second one is at index 1
    const error1 = new Error("first rejection");
    const error2 = new Error("second rejection");

    // Override process.emit to capture events
    (process as any).emit = function(event: string, ...args: any[]) {
      emittedEvents.push(event);
      return originalEmitFn.apply(process, [event, ...args] as any);
    };

    const rejected1 = Q.reject(error1);
    const rejected2 = Q.reject(error2);

    // With original code: index of rejected2 is 1, so 1 !== -1 is true → emits
    // With mutated code: index of rejected2 is 1, so 1 !== +1 is false → does NOT emit

    Q.nextTick.runAfter(function() {
      process.emit = originalEmitFn;
      rejected1.fail(() => {});
      rejected2.fail(() => {});
      Q.resetUnhandledRejections();

      // The unhandledRejection event should have been emitted for both promises
      expect(emittedEvents.filter(e => e === "unhandledRejection").length).toBe(2);
      done();
    });
  });
});