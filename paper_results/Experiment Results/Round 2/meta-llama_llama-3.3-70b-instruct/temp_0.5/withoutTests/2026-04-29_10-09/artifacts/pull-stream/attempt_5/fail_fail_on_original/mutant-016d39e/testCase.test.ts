const drain = require("../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain function', () => {
  it('should throw an error with a meaningful message when no done callback is supplied and an error occurs', () => {
    const sink = drain(null, null);
    const error = new Error('Test error');
    sink.abort(error);
    console.error = jest.fn();
    expect(() => {
      sink(null);
    }).toThrowError();
    expect((console.error as jest.Mock).mock.calls[0][0]).toBeInstanceOf(Error);
    expect((console.error as jest.Mock).mock.calls[0][0].message).not.toBe('');
  });
});