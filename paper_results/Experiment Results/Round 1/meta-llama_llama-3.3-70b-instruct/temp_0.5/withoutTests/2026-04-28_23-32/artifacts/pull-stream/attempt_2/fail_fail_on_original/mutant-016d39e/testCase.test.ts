import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error with a meaningful message when no done callback is supplied and an error occurs', () => {
    const drain = drainModule.default;
    const drainSink = drain(null, null);
    const read = jest.fn((err, cb) => {
      cb(true, new Error('Test error'));
    });
    drainSink(read);
    expect(read).toHaveBeenCalledTimes(1);
    expect(read).toHaveBeenCalledWith(undefined, expect.any(Function));
    const drainAbort = drainSink.abort;
    expect(drainAbort).toBeInstanceOf(Function);
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    drainSink(read);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy.mock.calls[0][0].message).toContain('no done callback supplied');
    consoleWarnSpy.mockRestore();
  });
});