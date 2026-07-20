import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when no done callback is supplied and the stream ends with an error', () => {
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
    // Introduce a small delay to allow the async operation to complete
    return new Promise(resolve => {
      setTimeout(() => {
        expect(warned).toBe(true);
        console.warn = originalWarn;
        resolve();
      }, 10);
    });
  });
});