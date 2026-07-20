import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("when abort called with function before source connected, abort signal passed to source is true", () => {
    const abortSignals: any[] = [];
    
    const source = (abort: any, cb: Function) => {
      abortSignals.push(abort);
      if (abort) { cb(abort); return; }
      cb(null, 1);
    };

    const sink = drain(() => {}, () => {});
    
    // Call abort BEFORE connecting source - sets abort flag
    sink.abort(function() {});
    
    // Now connect source - sink sees abort is set, calls sink.abort() again
    sink(source);
    
    // The abort value passed to source should be true
    expect(abortSignals.some(v => v === true)).toBe(true);
  });
});