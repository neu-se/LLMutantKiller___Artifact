import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("correctly sets abort signal to true (not false) when abort called with no args", (done) => {
    let abortValue: any;

    const source = (abort: any, cb: Function) => {
      if (abort !== null && abort !== undefined && abort !== false) {
        abortValue = abort;
        cb(abort);
      }
      // on normal read, hang (don't call cb)
    };

    const sink = drain(
      () => {},
      (err: any) => {
        // abort=true means source got true, cb(true) called, done(true) called
        // abort=false means source never gets called (false||true=true... wait)
        expect(abortValue).toBe(true);
        done();
      }
    );

    sink(source);
    sink.abort();
  });
});