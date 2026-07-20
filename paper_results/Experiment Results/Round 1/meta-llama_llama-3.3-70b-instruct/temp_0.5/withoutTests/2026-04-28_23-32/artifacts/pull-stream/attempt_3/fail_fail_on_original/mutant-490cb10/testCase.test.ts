import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when no done callback is supplied', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    drain(null, null);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.objectContaining({ message: 'no done callback supplied' }));
  });
});