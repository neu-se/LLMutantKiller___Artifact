import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("should terminate an async stream when abort is called with only a callback function", (done) => {
    let dataCount = 0;
    let pendingCb: ((end: any, data?: any) => void) | null = null;

    function source(end: any, cb: (end: any, data?: any) => void) {
      if (end) {
        cb(end);
      } else {
        pendingCb = cb;
      }
    }

    const op = (data: any) => {
      dataCount++;
      return true; // never stop via op
    };

    const doneMock = jest.fn();
    const sink = drain(op, doneMock);
    sink(source);

    // Stream is paused waiting for async source
    expect(pendingCb).not.toBeNull();

    const abortCallback = jest.fn();
    sink.abort(abortCallback);

    // Now simulate data arriving - the pending callback fires
    // If abort is truthy: end = null || abort = truthy -> stream ends, done called
    // If abort is falsy: end = null || false = null -> stream continues, done NOT called
    const cb = pendingCb!;
    pendingCb = null;
    cb(null, 'some data');

    // done should have been called because abort was set
    expect(doneMock).toHaveBeenCalled();
    done();
  });
});