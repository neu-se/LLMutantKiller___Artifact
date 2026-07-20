import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should not call the done callback when abort is called and read is not set', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink.abort();
    expect(done).toHaveBeenCalledTimes(0);
  });

  it('should call the read function with abort when abort is called and read is set', () => {
    let readCalled = false;
    const read = () => {
      readCalled = true;
    };
    const sink = drain(() => {}, () => {});
    sink(read);
    sink.abort();
    expect(readCalled).toBe(true);
  });
});