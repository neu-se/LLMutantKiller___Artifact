import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when the rejection has been handled before the runAfter callback fires", (done) => {
    Q.resetUnhandledRejections();

    const testReason = new Error("test rejection that gets handled");
    let emitCount = 0;

    const handler = (_reason: unknown, _promise: unknown) => {
      emitCount++;
    };

    process.on("unhandledRejection", handler);

    // Create a rejected promise and handle it synchronously
    // This means untrackRejection will be called, removing it from unhandledRejections
    // before the runAfter callback fires
    const p = Q.reject(testReason);
    // Handle it immediately so untrackRejection removes it from the array
    p.fail(() => {});

    setTimeout(() => {
      process.removeListener("unhandledRejection", handler);
      // Original: indexOf returns -1 (not in array), -1 !== -1 is false -> does NOT emit -> emitCount = 0
      // Mutated:  indexOf returns -1 (not in array), -1 !== +1 is true  -> DOES emit    -> emitCount > 0
      expect(emitCount).toBe(0);
      Q.resetUnhandledRejections();
      done();
    }, 300);
  });
});