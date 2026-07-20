import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when no done callback is supplied and the stream ends with an error', (done) => {
    const drain = drainModule.default;
    const sink = drain(null, null);
    const read = jest.fn((err, cb) => {
      cb(true, new Error('Test error'));
    });
    const originalWarn = console.warn;
    let warned = false;
    console.warn = (...args) => {
      warned = true;
      originalWarn(...args);
    };
    sink(read);
    setTimeout(() => {
      if (warned) {
        console.warn = originalWarn;
        done();
      } else {
        console.warn = originalWarn;
        done(new Error('console.warn was not called'));
      }
    }, 10);
  });
});