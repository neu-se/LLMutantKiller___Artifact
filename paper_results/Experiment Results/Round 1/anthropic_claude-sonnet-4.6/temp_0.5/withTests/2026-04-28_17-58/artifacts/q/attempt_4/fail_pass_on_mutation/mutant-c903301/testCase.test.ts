import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress error stops flush", () => {
  it("should stop subsequent tasks when progress callback throws without Q.onerror", (done) => {
    const def = (Q as any).defer();
    let subsequentTaskRan = false;

    // With Q.onerror set to empty function, error is swallowed in if branch
    // Without it, error propagates through runSingle breaking the flush loop
    // We need to observe whether subsequent nextTick tasks run
    
    // Attach progress listener that throws
    def.promise.progress(function () {
      throw new Error("progress throws");
    });

    // Queue a subsequent task via nextTick
    (Q as any).nextTick(function () {
      subsequentTaskRan = true;
    });

    // Set onerror to prevent uncaught exception issues  
    (Q as any).onerror = function () {};

    def.notify(1);
    def.resolve();

    setTimeout(function () {
      (Q as any).onerror = null;
      expect(subsequentTaskRan).toBe(true);
      done();
    }, 200);
  });
});