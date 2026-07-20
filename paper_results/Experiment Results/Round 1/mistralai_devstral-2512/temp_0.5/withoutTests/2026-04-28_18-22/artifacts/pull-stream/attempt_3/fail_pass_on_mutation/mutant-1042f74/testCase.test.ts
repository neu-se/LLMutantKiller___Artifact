import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should handle empty stream correctly", (done) => {
    const source = (abort: any, cb: (end: boolean) => void) => {
      cb(true);
    };

    const sink = drain(null, (err: Error | null) => {
      expect(err).toBeNull();
      done();
    });

    sink(source);
  });
});