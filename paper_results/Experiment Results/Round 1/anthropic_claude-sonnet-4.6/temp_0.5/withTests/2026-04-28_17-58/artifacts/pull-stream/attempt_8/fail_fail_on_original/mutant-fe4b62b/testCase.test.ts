import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain.abort", () => {
  it("should call done with null when stream ends normally after abort with callback", (done) => {
    let callCount = 0;

    function source(end: any, cb: (end: any, data?: any) => void) {
      if (end) {
        cb(end);
      } else {
        // provide one value then end
        callCount++;
        if (callCount === 1) cb(null, 'data');
        else cb(true);
      }
    }

    let abortCallbackCalled = false;
    let doneCallbackCalled = false;
    let doneErr: any = 'not-called';

    const sink = drain(
      function op(data: any) {},
      function onDone(err: any) {
        doneCallbackCalled = true;
        doneErr = err;
        expect(abortCallbackCalled).toBe(true);
        expect(err).toBeNull();
        done();
      }
    );

    sink(source);

    sink.abort(function(err: any) {
      abortCallbackCalled = true;
      // With original: err=true passed to read, source ends, done called with null
      // With mutated: same because abort = false||true = true
      expect(err).toBeTruthy();
    });
  });
});