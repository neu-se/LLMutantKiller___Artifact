import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("calls done with null when abort is called with true as error", (done) => {
    const abortSignals: any[] = [];

    const source = (abort: any, cb: Function) => {
      abortSignals.push(abort);
      if (abort) {
        cb(abort);
      } else {
        // hang - never call cb
      }
    };

    const sink = drain(
      () => {},
      (err: any) => {
        expect(err).toBeNull();
        expect(abortSignals[abortSignals.length - 1]).toBe(true);
        done();
      }
    );

    sink(source);
    sink.abort(true);
  });
});