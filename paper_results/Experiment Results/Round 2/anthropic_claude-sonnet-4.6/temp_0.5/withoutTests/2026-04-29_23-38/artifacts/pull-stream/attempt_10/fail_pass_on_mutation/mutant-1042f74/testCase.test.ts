import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("sink function returns early when abort is set before read is assigned", () => {
    let sinkCalled = false;
    let readCalled = false;
    let abortCalled = false;

    // Create a source that tracks if it was called
    function source(end: any, cb: Function) {
      readCalled = true;
      if (end) {
        abortCalled = true;
        cb(end);
        return;
      }
      cb(null, 1);
    }

    const sink = drain(
      (_data: any) => {},
      (_err: any) => {}
    );

    // Set abort before connecting
    sink.abort();

    // Connect source - should call sink.abort() internally
    sink(source);

    expect(readCalled).toBe(true);
    expect(abortCalled).toBe(true);
  });
});