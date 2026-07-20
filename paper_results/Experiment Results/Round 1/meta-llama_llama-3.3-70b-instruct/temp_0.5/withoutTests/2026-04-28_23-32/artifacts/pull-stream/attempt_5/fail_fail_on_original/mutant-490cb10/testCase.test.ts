import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when no done callback is supplied and an error occurs', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const sink = drain(null, null);
    sink(null, (end, data) => {
      throw new Error('test error');
    });
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.objectContaining({ message: 'no done callback supplied' }));
  });
});