import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink error handling', () => {
  it('should warn and throw when done is missing and stream ends with non-true value', () => {
    const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(null, 'data');
      cb('error');
    };

    expect(() => {
      const sink = drain();
      sink(source);
    }).toThrow('error');

    expect(mockConsoleWarn).toHaveBeenCalledWith(expect.objectContaining({
      message: 'no done callback supplied'
    }));

    mockConsoleWarn.mockRestore();
  });
});