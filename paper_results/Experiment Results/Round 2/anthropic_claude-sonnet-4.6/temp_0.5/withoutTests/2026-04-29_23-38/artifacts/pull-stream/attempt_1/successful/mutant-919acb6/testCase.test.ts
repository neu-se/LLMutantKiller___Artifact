import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should not throw when stream ends normally (end === true) without a done callback", () => {
    // Create a simple source that immediately ends
    let callCount = 0;
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) {
        cb(end);
        return;
      }
      callCount++;
      if (callCount === 1) {
        cb(null, "data");
      } else {
        cb(true); // normal end
      }
    };

    // Without a done callback - in original code this should not throw on normal end
    // In mutated code, it will throw because end===true satisfies `end !== false`
    expect(() => {
      const sink = drain(null); // no done callback
      sink(source);
    }).not.toThrow();
  });
});