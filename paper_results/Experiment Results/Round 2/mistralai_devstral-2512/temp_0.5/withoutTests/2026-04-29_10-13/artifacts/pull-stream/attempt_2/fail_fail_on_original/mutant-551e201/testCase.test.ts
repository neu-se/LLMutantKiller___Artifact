import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink error handling', () => {
  it('should warn and throw when done is missing and stream ends with error', () => {
    const error = new Error('test error');
    const mockWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const source = (abort: any, cb: (err: Error | null, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain(null, undefined);
    expect(() => {
      source(null, sink);
    }).toThrow(error);

    expect(mockWarn).toHaveBeenCalledWith(expect.any(Error));
    mockWarn.mockRestore();
  });
});