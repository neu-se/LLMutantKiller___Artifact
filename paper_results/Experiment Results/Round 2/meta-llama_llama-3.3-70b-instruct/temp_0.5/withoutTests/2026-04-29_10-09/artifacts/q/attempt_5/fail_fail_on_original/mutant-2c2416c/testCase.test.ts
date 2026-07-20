import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
  it('should correctly handle deprecation warnings', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    const deprecatedFunction = (q as any).deprecate;
    expect(deprecatedFunction).toBeInstanceOf(Function);
    const func = deprecatedFunction(() => {}, 'testFunction', 'alternativeFunction');
    func();
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith('testFunction is deprecated, use alternativeFunction instead.', expect.any(Error));
  });
});