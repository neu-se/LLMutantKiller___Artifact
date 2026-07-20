import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking with process.emit", () => {
  it("should emit unhandledRejection event for unhandled rejections", (done) => {
    const reason = new Error("test rejection");
    let emitted = false;

    const handler = (err: Error) => {
      if (err === reason) {
        emitted = true;
      }
    };

    process.on("unhandledRejection", handler);

    Q.reject(reason);

    // setImmediate fires after I/O, process.nextTick fires before
    // The runAfter queue (which emits unhandledRejection) should fire
    // Use setImmediate to check after all microtasks and I/O
    setImmediate(() => {
      setImmediate(() => {
        process.removeListener("unhandledRejection", handler);
        expect(emitted).toBe(true);
        done();
      });
    });
  });
});