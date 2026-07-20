import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should warn when done is not provided and stream ends with error', (done) => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const error = new Error('stream error');

    const source = (abort: any, cb: (end: Error | boolean | null, data?: any) => void) => {
      if (abort) return cb(abort);
      // First call with data
      cb(null, 'data');
      // Second call with error to end stream
      cb(error);
    };

    const sink = drain(null, undefined);
    sink(source);

    setImmediate(() => {
      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.objectContaining({
        message: 'no done callback supplied'
      }));
      consoleWarnSpy.mockRestore();
      done();
    });
  });
});