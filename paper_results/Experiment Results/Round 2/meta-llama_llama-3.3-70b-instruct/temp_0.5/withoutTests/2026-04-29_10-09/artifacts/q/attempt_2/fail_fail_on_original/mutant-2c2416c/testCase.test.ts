import { deprecate } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('deprecate', () => {
  it('should throw an error when the deprecated function is called', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    const deprecatedFunction = deprecate(() => {}, 'testFunction', 'alternativeFunction');
    deprecatedFunction();
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith('testFunction is deprecated, use alternativeFunction instead.', new Error("").stack);
  });
});