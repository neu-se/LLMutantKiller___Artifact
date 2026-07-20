import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain.abort", () => {
  it("should properly abort a hanging stream when abort is called with a callback before source is connected", (done) => {
    let sourceAbortValue: any = "never-called";
    let readCallCount = 0;

    function hangingSource(end: any, cb: (end: any, data?: any) => void) {
      readCallCount++;
      if (end) {
        sourceAbortValue = end;
        cb(end);
      }
      // on normal read: hang forever (don't call cb)
    }

    const sink = drain(
      function op() {},
      function onDone(err: any) {
        // Should be called with null (abort=true -> null)
        expect(err).toBeNull();
        expect(sourceAbortValue).toBe(true);
        done();
      }
    );

    // Abort BEFORE connecting - sets abort variable
    // Original: err=true -> abort = true||true = true
    // Mutated:  err=false -> abort = false||true = true
    // Both: abort=true, read is null so no read call yet
    sink.abort(function(err: any) {
      expect(err).toBe(true);
    });

    // Now connect - sink checks if(abort) -> true in both cases -> calls sink.abort()
    // sink.abort() called with no args: err=undefined, abort already true
    // read(true, undefined) -> source gets end=true -> calls cb(true)
    // But cb is undefined... read(abort, cb || function(){})
    // cb = undefined -> uses function(){} -> onDone never called?
    sink(hangingSource);
  });
});