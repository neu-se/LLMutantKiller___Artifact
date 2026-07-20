import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("aborts stream when abort is called before source is connected", (done) => {
    const source = jest.fn((abort: any, cb: Function) => {
      if (abort) {
        cb(abort);
        return;
      }
      cb(null, 1);
    });

    const sink = drain(
      (_data: any) => {},
      (err: any) => {
        // If abort was set to false, sink(source) won't call sink.abort()
        // and source will be read normally, eventually ending with null error
        // If abort was set to true, sink(source) calls sink.abort() immediately
        expect(err).toBeNull();
        // source should have been called with abort signal, not normal reads
        const abortCalls = source.mock.calls.filter(([abort]) => abort);
        expect(abortCalls.length).toBeGreaterThan(0);
        done();
      }
    );

    // Call abort BEFORE connecting source
    // With original: err=true inside if, abort = true||true = true
    // With mutated: err=false inside if, abort = false||true = true  
    // Both result in abort=true... 
    sink.abort(function(_err: any) {});
    sink(source);
  });
});