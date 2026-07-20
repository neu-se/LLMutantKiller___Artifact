import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the read function with abort when sink.abort is called', (done) => {
    const read = jest.fn();
    const sink = drain(null, () => {});
    sink(read);
    read(null, () => {});
    sink.abort();
    process.nextTick(() => {
      expect(read).toHaveBeenCalledTimes(3);
      expect(read).toHaveBeenNthCalledWith(2, null, expect.any(Function));
      expect(read).toHaveBeenNthCalledWith(3, true, expect.any(Function));
      done();
    });
  });
});