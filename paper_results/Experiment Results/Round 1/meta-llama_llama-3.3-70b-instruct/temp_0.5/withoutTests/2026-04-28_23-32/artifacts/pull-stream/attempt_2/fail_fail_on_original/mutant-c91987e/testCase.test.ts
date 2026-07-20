import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the read function with abort when sink.abort is called', (done) => {
    const read = jest.fn();
    const sink = drainModule.drain(null, () => {});
    sink(_read => {
      read(_read);
      _read(null, () => {});
      sink.abort();
      process.nextTick(() => {
        expect(read).toHaveBeenCalledTimes(2);
        expect(read).toHaveBeenNthCalledWith(2, true, expect.any(Function));
        done();
      });
    });
  });
});