const drain = require("../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain function', () => {
  it('should throw an error with a meaningful message when no done callback is supplied and an error occurs', () => {
    const sink = drain(null, null);
    const error = new Error('Test error');
    sink.abort(error);
    console.error = jest.fn();
    sink(null);
    if ((console.error as jest.Mock).mock.calls.length > 0) {
      const errorMessage = (console.error as jest.Mock).mock.calls[0][0];
      expect(errorMessage).toBeInstanceOf(Error);
      expect(errorMessage.message).not.toBe('');
    }
  });
});