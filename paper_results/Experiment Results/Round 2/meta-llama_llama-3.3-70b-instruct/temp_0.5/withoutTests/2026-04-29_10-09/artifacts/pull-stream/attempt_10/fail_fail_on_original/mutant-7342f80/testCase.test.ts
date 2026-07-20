import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when no done callback is supplied and the stream ends with an error', (done) => {
    const drain = drainModule.default;
    const sink = drain(null, null);
    const read = jest.fn((err, cb) => {
      cb(true, new Error('Test error'));
    });
    const originalThrow = console.error;
    let errorThrown = false;
    console.error = (...args) => {
      errorThrown = true;
      originalThrow(...args);
    };
    sink(read);
    setTimeout(() => {
      expect(errorThrown).toBe(true);
      console.error = originalThrow;
      done();
    }, 10);
  });
});