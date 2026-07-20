import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("passes true as abort signal to source when abort called with only a callback", (done) => {
    const abortValues: any[] = [];

    const source = (abort: any, cb: Function) => {
      abortValues.push(abort);
      if (abort) {
        cb(abort);
      } else {
        cb(null, 1);
      }
    };

    const sink = drain(
      () => {},
      (err: any) => {
        expect(err).toBeNull();
        expect(abortValues[abortValues.length - 1]).toBe(true);
        done();
      }
    );

    sink(source);
    setTimeout(() => sink.abort(function() {}), 20);
  });
});