import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("should call the abort callback when abort is invoked with only a callback argument", (done) => {
    let storedReadCb: ((end: any, data?: any) => void) | null = null;
    const endSignalsReceived: any[] = [];

    // Async source: on first call (end=null), stores cb without calling it
    // On subsequent calls with truthy end, calls cb(end) immediately
    function source(end: any, cb: (end: any, data?: any) => void) {
      endSignalsReceived.push(end);
      if (end) {
        cb(end);
      } else {
        storedReadCb = cb;
      }
    }

    const sink = drain(null, null);
    sink(source);

    // source was called with (null, cb) - async, so loop exited
    expect(storedReadCb).not.toBeNull();

    const abortCb = jest.fn();
    sink.abort(abortCb);

    // Original: abort=true -> read(true, abortCb) -> source gets end=true -> abortCb(true) called
    // Mutated:  abort=false -> read(false, abortCb) -> source gets end=false -> abortCb NOT called

    expect(abortCb).toHaveBeenCalled();
    done();
  });
});