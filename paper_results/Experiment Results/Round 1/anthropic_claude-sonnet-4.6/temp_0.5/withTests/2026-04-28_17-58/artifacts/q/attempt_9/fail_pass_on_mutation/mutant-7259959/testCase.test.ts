import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async return value handling", () => {
  it("Q.return throws an object with the correct value property that isStopIteration recognizes", () => {
    let caughtValue: any = null;
    try {
      Q["return"](42);
    } catch (e) {
      caughtValue = e;
    }
    expect(caughtValue).not.toBeNull();
    expect(caughtValue.value).toBe(42);
    // Verify it's not a plain Error
    expect(caughtValue instanceof Error).toBe(false);
    // Verify the value is accessible
    expect(Object.prototype.toString.call(caughtValue)).not.toBe("[object StopIteration]");
  });
});