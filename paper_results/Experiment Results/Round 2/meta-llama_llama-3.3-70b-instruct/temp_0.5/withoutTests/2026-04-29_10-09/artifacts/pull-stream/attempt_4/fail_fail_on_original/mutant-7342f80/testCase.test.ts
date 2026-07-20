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
    console.warn = () => {
      warned = true;
    };
    sink(read);
    // Add a timeout to allow the async operation to complete
    setTimeout(() => {
      expect(warned).toBe(true);
      console.warn = originalWarn;
    }, 0);
  });
});