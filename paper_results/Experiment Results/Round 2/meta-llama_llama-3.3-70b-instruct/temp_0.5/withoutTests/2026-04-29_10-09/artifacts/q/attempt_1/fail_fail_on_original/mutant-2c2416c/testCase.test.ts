import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should deprecate with the correct message', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    const deprecatedFunction = Q.deprecate(() => {}, 'testFunction', 'alternativeFunction');
    deprecatedFunction();
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith('testFunction is deprecated, use alternativeFunction instead.');
  });
});