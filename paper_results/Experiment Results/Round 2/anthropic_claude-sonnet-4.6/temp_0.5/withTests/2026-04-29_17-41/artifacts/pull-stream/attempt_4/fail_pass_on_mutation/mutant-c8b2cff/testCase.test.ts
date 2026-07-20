import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain", () => {
  it("passes custom abort error to done when abort fires during async data delivery", (done) => {
    const customError = new Error("custom abort error");
    let pendingDataCb: ((end: any, data?: any) => void) | null = null;
    let abortCbFromSinkAbort: ((end: any) => void) | null = null;
    const doneErrors: any[] = [];

    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        // This is called by sink.abort(customError) directly
        abortCbFromSinkAbort = cb;
        return;
      }
      // Async: hold the callback
      pendingDataCb = cb;
    }

    const sink = drain(
      (_data: any) => true,
      (err: any) => {
        doneErrors.push(err);
      }
    );

    sink(source);

    // Abort with custom error - this calls read(customError, abortCb) 
    // source stores abortCb but doesn't call it yet
    sink.abort(customError);

    // Now deliver data from the pending read - abort is set
    // The loop callback fires: end=null, abort=customError
    // else if(... || abort) fires -> read(abort||true, done) vs read(true, done)
    // But read is called with abort (customError) or true
    // Source receives customError or true, and calls done with it
    const dataCb = pendingDataCb;
    pendingDataCb = null;
    if (dataCb) dataCb(null, 42);

    // Now the abort cb from sink.abort needs to be resolved too
    // The done callback should have been called once
    // In original: read(customError, done) -> source gets customError -> done(customError)
    // In mutated: read(true, done) -> source gets true -> done(true) -> done(true===true ? null : true) 
    // Wait, done here is the RAW done, not wrapped!

    setTimeout(() => {
      expect(doneErrors.length).toBeGreaterThan(0);
      expect(doneErrors[0]).toBe(customError);
      done();
    }, 50);
  });
});