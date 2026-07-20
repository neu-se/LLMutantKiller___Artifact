import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when no done callback is supplied and the stream ends with an error', (done) => {
    const drain = drainModule.default;
    const sink = drain(null, null);
    const read = jest.fn((err, cb) => {
      cb(true, new Error('Test error'));
    });
    sink(read);
    setTimeout(() => {
      expect(console.warn).toHaveBeenCalledTimes(1);
      done();
    }, 10);
  });
});