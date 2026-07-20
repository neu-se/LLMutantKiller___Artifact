import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
  it('should correctly handle deprecation warnings', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    const func = q((resolve: (value: any) => void, reject: (reason: any) => void) => {
      const deprecatedFunction = function () {
        console.warn('testFunction is deprecated, use alternativeFunction instead.', new Error("").stack);
      };
      deprecatedFunction();
      resolve();
    });
    expect(typeof func).toBe('object');
    expect(func.then).toBeInstanceOf(Function);
    func.then(() => {
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).toHaveBeenCalledWith('testFunction is deprecated, use alternativeFunction instead.', new Error("").stack);
    });
  });
});