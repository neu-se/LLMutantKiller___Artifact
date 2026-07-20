import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("emits unhandledRejection event for the second unhandled rejected promise", (done) => {
    Q.resetUnhandledRejections();

    const reason1 = new Error("first rejection");
    const reason2 = new Error("second rejection");
    const emittedPromises: unknown[] = [];

    const listener = (_reason: unknown, promise: unknown) => {
      emittedPromises.push(promise);
    };

    process.on("unhandledRejection", listener);

    const p1 = Q.reject(reason1);
    const p2 = Q.reject(reason2);

    setTimeout(() => {
      process.removeListener("unhandledRejection", listener);
      Q.resetUnhandledRejections();
      // With original: both p1 (index 0) and p2 (index 1) emit (0 !== -1 and 1 !== -1)
      // With mutation: p1 emits (0 !== 1 = true) but p2 does NOT (1 !== 1 = false)
      expect(emittedPromises).toContain(p2);
      done();
    }, 200);
  });
});