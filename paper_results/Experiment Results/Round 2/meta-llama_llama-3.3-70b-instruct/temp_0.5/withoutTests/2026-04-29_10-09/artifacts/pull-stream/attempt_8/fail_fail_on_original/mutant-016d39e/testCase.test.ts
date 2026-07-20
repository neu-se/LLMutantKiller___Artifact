import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error with a meaningful message when no done callback is supplied and an error occurs', () => {
    const sink = drain(null, null);
    const error = new Error('Test error');
    sink.abort(error);
    console.error = jest.fn();
    sink(null);
    expect((console.error as jest.Mock).mock.calls.length).toBe(1);
    if ((console.error as jest.Mock).mock.calls.length > 0) {
      expect((console.error as jest.Mock).mock.calls[0][0]).toBeInstanceOf(Error);
      expect((console.error as jest.Mock).mock.calls[0][0].message).not.toBe('');
    }
  });
});