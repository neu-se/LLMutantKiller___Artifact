import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should handle synchronous stream with immediate callback", (done) => {
    let callCount = 0;
    const source = (abort: any, cb: (end: boolean | Error, data?: string) => void) => {
      if (callCount === 0) {
        callCount++;
        cb(false, "data1");
      } else if (callCount === 1) {
        callCount++;
        cb(false, "data2");
      } else {
        cb(true);
      }
    };

    const sink = drain((data: string) => {
      expect(data).toBeDefined();
      return true;
    }, (err: Error | null) => {
      expect(err).toBeNull();
      expect(callCount).toBe(3);
      done();
    });

    sink(source);
  });
});