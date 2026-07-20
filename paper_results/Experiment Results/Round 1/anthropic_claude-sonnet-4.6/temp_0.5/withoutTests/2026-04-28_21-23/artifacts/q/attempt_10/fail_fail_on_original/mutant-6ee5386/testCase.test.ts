import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q threw mutation detection", () => {
  it("downstream progress value should not be a promise when handler throws", async () => {
    const deferred = Q.defer();
    const downstreamProgressValues: unknown[] = [];
    const progressError = new Error("progress error");
    let progressErrorCaught = false;

    // Catch the re-thrown progress error to prevent test crash
    const uncaughtHandler = (err: Error) => {
      if (err === progressError) {
        progressErrorCaught = true;
      }
    };
    process.on("uncaughtException", uncaughtHandler);

    try {
      const p1 = deferred.promise.then(
        (v: unknown) => v,
        null,
        function () {
          throw progressError;
        }
      );

      const p2 = p1.then(
        (v: unknown) => v,
        null,
        function (prog: unknown) {
          downstreamProgressValues.push(prog);
        }
      );

      deferred.notify("trigger");
      deferred.resolve(42);

      await p2;
      await new Promise((resolve) => setTimeout(resolve, 50));
    } finally {
      process.removeListener("uncaughtException", uncaughtHandler);
    }

    // Original (threw=true): error re-thrown, progressErrorCaught=true, no downstream progress
    // Mutated (threw=false): error swallowed, progressErrorCaught=false, downstream gets promise
    expect(progressErrorCaught).toBe(true);
    expect(downstreamProgressValues).toHaveLength(0);
  });
});