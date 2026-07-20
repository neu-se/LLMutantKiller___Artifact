import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("should abort before sink receives source and then work when source connects", (done) => {
    const sink = drain(
      (data: any) => {},
      (err: any) => {
        expect(err).toBeNull();
        done();
      }
    );

    // Abort before connecting source
    sink.abort();

    // Now connect source - sink.abort() should be called again
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      cb(end || true);
    };

    sink(source);
  });
});