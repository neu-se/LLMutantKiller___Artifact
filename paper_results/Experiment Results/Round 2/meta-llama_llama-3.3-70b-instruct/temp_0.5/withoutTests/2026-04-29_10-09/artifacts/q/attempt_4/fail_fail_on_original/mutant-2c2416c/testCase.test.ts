import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
  it('should correctly handle deprecation warnings', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    const deprecatedFunction = q.deprecate(() => {}, 'testFunction', 'alternativeFunction');
    deprecatedFunction();
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith('testFunction is deprecated, use alternativeFunction instead.', new Error("").stack);
  });
});