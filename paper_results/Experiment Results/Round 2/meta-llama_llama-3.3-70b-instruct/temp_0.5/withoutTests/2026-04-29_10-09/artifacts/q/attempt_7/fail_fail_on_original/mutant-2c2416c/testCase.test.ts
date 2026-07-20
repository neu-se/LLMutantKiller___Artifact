import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
  it('should correctly handle deprecation warnings', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    const originalDeprecate = (q as any).deprecate;
    (q as any).deprecate = () => {};
    const func = (q as any).deprecate(() => {}, 'testFunction', 'alternativeFunction');
    func();
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith('testFunction is deprecated, use alternativeFunction instead.', new Error("").stack);
    (q as any).deprecate = originalDeprecate;
  });
});