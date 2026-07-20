import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when no done callback is supplied', () => {
    const sink = drain(null, null);
    sink(null, () => {});
    // Since the error is thrown asynchronously, we can't directly assert it
    // Instead, we can use a try-catch block and a timeout to verify the error
    const consoleErrorSpy = jest.spyOn(console, 'error');
    drain(null, null);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.objectContaining({ message: 'no done callback supplied' }));
  });
});