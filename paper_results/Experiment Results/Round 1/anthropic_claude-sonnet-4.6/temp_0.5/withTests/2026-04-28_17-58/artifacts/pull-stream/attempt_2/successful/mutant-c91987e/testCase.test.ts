import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink.abort with connected source', () => {
  it('calls the abort callback when abort is invoked after sink is connected to a source', (done) => {
    // A source that hangs indefinitely until aborted
    let storedCb: ((end: any, data?: any) => void) | null = null;

    const hangingSource = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      // Hang: store the callback but never call it (simulates async source waiting)
      storedCb = cb;
    };

    const sink = drain(
      (_data: any) => {}, // op: consume data
      (_err: any) => {}   // done: no-op
    );

    // Connect the sink to the source - this sets `read` inside drain
    // The source hangs after the first read attempt
    sink(hangingSource);

    // At this point, the drain loop is waiting for data (storedCb is set)
    // Now abort the sink with a callback
    sink.abort(true, (err: any) => {
      // In original: read(abort, cb) is called -> hangingSource calls cb(true) -> this runs
      // In mutated:  if(false) skips the call -> this never runs -> test times out/fails
      expect(err).toBe(true);
      done();
    });
  });
});