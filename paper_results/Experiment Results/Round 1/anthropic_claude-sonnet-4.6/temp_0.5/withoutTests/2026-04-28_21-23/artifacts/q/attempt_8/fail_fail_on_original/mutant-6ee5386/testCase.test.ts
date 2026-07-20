import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q runSingle threw mutation", () => {
  it("errors thrown in nextTick tasks should propagate as uncaught exceptions", (done) => {
    const taskError = new Error("task error");
    let errorCaught = false;

    const handler = (e: Error) => {
      if (e === taskError) {
        errorCaught = true;
        // Original (threw=true): this fires
        expect(errorCaught).toBe(true);
        process.removeListener("uncaughtException", handler);
        done();
      }
    };

    process.on("uncaughtException", handler);

    Q.nextTick(function() {
      throw taskError;
    });

    // If mutated (threw=false), the error is swallowed and done() never called
    // causing a timeout failure
    setTimeout(() => {
      process.removeListener("uncaughtException", handler);
      if (!errorCaught) {
        done(new Error("Expected uncaught exception but none occurred - mutation detected"));
      }
    }, 100);
  });
});