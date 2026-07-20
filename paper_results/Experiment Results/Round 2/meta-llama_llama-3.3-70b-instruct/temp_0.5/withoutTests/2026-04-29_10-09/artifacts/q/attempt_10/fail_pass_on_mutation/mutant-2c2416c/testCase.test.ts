import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
  it('should correctly handle deprecation warnings', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    const deprecatedFunction = () => {
      console.warn('testFunction is deprecated, use alternativeFunction instead.', new Error("").stack);
    };
    const func = q(deprecatedFunction);
    expect(typeof func).toBe('object');
    expect(func.then).toBeInstanceOf(Function);
    func.then(() => {
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('testFunction is deprecated'), expect.any(Error));
    });
  });
});