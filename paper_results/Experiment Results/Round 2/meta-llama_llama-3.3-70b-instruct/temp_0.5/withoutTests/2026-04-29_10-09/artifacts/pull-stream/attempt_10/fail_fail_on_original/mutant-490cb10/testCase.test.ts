import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should log a warning when no done callback is supplied', () => {
    const drain = drainModule.default;
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    const sink = drain(null, null);
    sink.abort();
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('no done callback supplied'));
  });
});