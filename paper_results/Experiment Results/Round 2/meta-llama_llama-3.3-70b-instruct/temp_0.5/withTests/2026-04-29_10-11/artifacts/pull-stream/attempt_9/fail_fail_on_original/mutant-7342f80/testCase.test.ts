import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should warn when no done callback is supplied', () => {
    const originalConsoleWarn = console.warn;
    const warnSpy = jest.fn();
    console.warn = warnSpy;
    drain(() => true);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    console.warn = originalConsoleWarn;
  });
});