import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q flush continuation after error", () => {
  it("continues flushing remaining tasks after a task throws", () => {
    return new Promise<void>((resolve, reject) => {
      const results: number[] = [];
      const timeoutId = setTimeout(() => {
        if (results.indexOf(2) !== -1) {
          resolve();
        } else {
          reject(new Error("Second task never ran, results: " + JSON.stringify(results)));
        }
      }, 300);

      // Catch the thrown error so Jest doesn't fail
      const originalListeners = process.listeners("uncaughtException");
      process.removeAllListeners("uncaughtException");
      process.once("uncaughtException", function () {
        // re-add original listeners
        originalListeners.forEach(l => process.on("uncaughtException", l as any));
      });

      Q.nextTick(function () {
        results.push(1);
        throw new Error("task 1 error");
      });

      Q.nextTick(function () {
        results.push(2);
      });
    });
  });
});