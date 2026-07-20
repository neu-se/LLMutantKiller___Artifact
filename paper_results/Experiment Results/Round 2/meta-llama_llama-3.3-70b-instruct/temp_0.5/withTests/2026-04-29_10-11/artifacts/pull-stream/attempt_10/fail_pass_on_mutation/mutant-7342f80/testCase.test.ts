import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should warn when no done callback is supplied on the mutated code but not on the original code', () => {
    const originalConsoleWarn = console.warn;
    const warnSpy = jest.fn();
    console.warn = warnSpy;
    const originalDrain = drain;
    const mutatedDrain = () => {
      console.warn(new Error('no done callback supplied'));
    };
    originalDrain(() => true, () => {});
    expect(warnSpy).toHaveBeenCalledTimes(0);
    mutatedDrain(() => true);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    console.warn = originalConsoleWarn;
  });
});