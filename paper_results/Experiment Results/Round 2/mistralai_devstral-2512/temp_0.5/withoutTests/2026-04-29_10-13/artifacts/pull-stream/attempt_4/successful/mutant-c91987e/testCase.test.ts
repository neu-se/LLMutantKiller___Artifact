import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort functionality', () => {
  it('should call read with abort when sink.abort is invoked', () => {
    let abortCalled = false;
    const mockRead = (end: unknown, cb: () => void) => {
      if (end === true) {
        abortCalled = true;
        cb();
      }
    };

    const sink = drain(null, () => {});
    sink(mockRead);
    sink.abort();

    expect(abortCalled).toBe(true);
  });
});