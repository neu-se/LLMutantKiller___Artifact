import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("sets abort to true (not false) when abort called with a function argument", (done) => {
    let receivedAbort: any = undefined;

    const source = (abort: any, cb: Function) => {
      if (abort !== null && abort !== undefined) {
        receivedAbort = abort;
        cb(abort);
        return;
      }
      // hang on normal read
    };

    const sink = drain(() => {}, () => {
      expect(receivedAbort).toBe(true);
      done();
    });

    sink(source);
    
    // Call abort with a function as first arg - if condition were "function" == typeof err,
    // original would set err=true, mutated would set err=false
    const abortCb = () => {};
    sink.abort(abortCb);
  });
});