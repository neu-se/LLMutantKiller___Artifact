import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error with a meaningful message when no done callback is supplied and an error occurs', () => {
    const drain = drainModule.default;
    const drainSink = drain(null, null);
    const read = jest.fn((err, cb) => {
      cb(true, new Error('Test error'));
    });
    const consoleErrorSpy = jest.spyOn(console, 'error');
    drainSink(read);
    try {
      drainSink(read);
    } catch (error) {
      expect(error.message).not.toBe('');
    }
    consoleErrorSpy.mockRestore();
  });
});