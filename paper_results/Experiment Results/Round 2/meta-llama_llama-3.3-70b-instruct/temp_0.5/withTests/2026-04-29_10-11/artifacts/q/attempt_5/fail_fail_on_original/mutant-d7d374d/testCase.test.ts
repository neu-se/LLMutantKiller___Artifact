import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('deprecate function', () => {
    it('should call console.warn when deprecated function is called', () => {
        const warnSpy = jest.spyOn(console, 'warn');
        const originalFunction = () => {};
        const deprecatedFunction = q.deprecate(originalFunction, 'deprecatedFunction', 'newFunction');
        deprecatedFunction();
        expect(warnSpy).toHaveBeenCalledTimes(1);
    });
});