import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
  it('should correctly handle deprecation warnings', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    const originalConsoleWarn = console.warn;
    console.warn = jest.fn();
    const func = q((resolve, reject) => {
      const deprecatedFunction = function () {
        console.warn('testFunction is deprecated, use alternativeFunction instead.', new Error("").stack);
      };
      deprecatedFunction();
      resolve();
    });
    func();
    console.warn = originalConsoleWarn;
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith('testFunction is deprecated, use alternativeFunction instead.', new Error("").stack);
  });
});