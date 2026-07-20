import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when no done callback is supplied', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const sink = drain(null, null);
    const read = jest.fn((err, cb) => {
      cb(true, null);
    });
    sink(read);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.objectContaining({ message: 'no done callback supplied' }));
  });
});