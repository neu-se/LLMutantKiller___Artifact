import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("emits rejectionHandled after unhandledRejection was reported and then handled", (done) => {
    Q.resetUnhandledRejections();

    const reason = new Error("unhandled rejection test");
    let rejectionHandledCount = 0;

    const onRejectionHandled = () => {
      rejectionHandledCount++;
    };

    process.on("rejectionHandled", onRejectionHandled);

    // Create rejected promise - trackRejection schedules unhandledRejection via runAfter
    const rejected = Q.reject(reason);

    // Use process.nextTick to wait until after runAfter callbacks have fired
    // runAfter pushes to laterQueue which runs after the main flush
    // We need to let the event loop run multiple times
    setImmediate(() => {
      setImmediate(() => {
        setImmediate(() => {
          // By now, unhandledRejection should have fired and promise added to reportedUnhandledRejections
          // Now handle the rejection - triggers untrackRejection
          rejected.fail(() => {});

          setImmediate(() => {
            setImmediate(() => {
              setImmediate(() => {
                process.removeListener("rejectionHandled", onRejectionHandled);
                try {
                  // Original: rejectionHandled emitted (count = 1)
                  // Mutated: rejectionHandled NOT emitted (count = 0)
                  expect(rejectionHandledCount).toBe(1);
                  done();
                } catch (e) {
                  done(e);
                }
              });
            });
          });
        });
      });
    });
  });
});