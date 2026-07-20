import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should log a warning when no done callback is supplied', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    const read = () => {
      return (abort: any, cb: any) => {
        cb(null, 'data');
      };
    };

    const sink = drain(null, null);
    sink(read);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});