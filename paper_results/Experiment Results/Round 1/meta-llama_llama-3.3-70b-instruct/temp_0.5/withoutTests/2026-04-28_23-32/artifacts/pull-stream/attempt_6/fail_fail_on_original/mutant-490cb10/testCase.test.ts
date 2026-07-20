import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when no done callback is supplied', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const sink = drain(null, null);
    sink.read = jest.fn((_, cb) => cb(new Error('test error')));
    sink.read(null, () => {});
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.objectContaining({ message: 'no done callback supplied' }));
  });
});