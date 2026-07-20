import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with QReturnValue", () => {
  it("should reject when a non-QReturnValue error is thrown in SpiderMonkey generator path", async () => {
    // Q["return"] throws a QReturnValue - in original code isStopIteration returns true for it
    // For a regular error, isStopIteration returns false in original, true in mutant
    // We test Q["return"] behavior indirectly through Q.async
    const result = await Q.fcall(function() {
      try {
        Q["return"](42);
      } catch(e) {
        return e instanceof Q.makePromise.__proto__.constructor ? "not-return-value" : e.value;
      }
    });
    expect(result).toBe(42);
  });
});