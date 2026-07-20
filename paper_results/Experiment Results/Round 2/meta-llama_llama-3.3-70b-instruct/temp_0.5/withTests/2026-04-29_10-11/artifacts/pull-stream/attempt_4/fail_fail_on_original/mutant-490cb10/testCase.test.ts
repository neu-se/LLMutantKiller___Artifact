import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should log a warning when no done callback is supplied and an error occurs', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const read = () => {
      return (abort: any, cb: any) => {
        cb(new Error('Test error'));
      };
    };

    const sink = drain(null, null);
    sink(read);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});