import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should not throw when stream ends normally (end === true) without a done callback", () => {
    // Create a simple source that emits one value then ends
    let callCount = 0;
    const source = (_abort: any, cb: (end: boolean | null, data?: any) => void) => {
      callCount++;
      if (callCount === 1) {
        cb(null, "hello");
      } else {
        cb(true, undefined); // normal end
      }
    };

    // Without a done callback, the original code should NOT throw on normal end (end === true)
    // The mutated code changes `end !== true` to `end !== false`, causing it to throw on normal end
    expect(() => {
      const sink = drain(null);
      sink(source);
    }).not.toThrow();
  });
});