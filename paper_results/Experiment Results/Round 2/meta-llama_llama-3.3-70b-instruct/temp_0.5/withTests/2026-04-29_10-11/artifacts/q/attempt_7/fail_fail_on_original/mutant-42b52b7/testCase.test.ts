import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
  it("should test the behavior of the mutated file", async () => {
    const promise = Q.reject(new Error("Test error"));
    Q.resetUnhandledRejections();

    const trackedPromise = Q.reject(new Error("Tracked error"));
    const process = { emit: jest.fn() };

    if (typeof process === "object" && typeof process.emit === "function") {
      Q.nextTick.runAfter(function () {
        if (trackedPromise.isPending()) {
          process.emit("unhandledRejection", new Error("Tracked error"), trackedPromise);
        }
      });
    }

    await Q.delay(10, 10);
    if (typeof process.emit === "function") {
      expect(process.emit).toHaveBeenCalledTimes(1);
    } else {
      expect(process.emit).toHaveBeenCalledTimes(0);
    }
  });
});