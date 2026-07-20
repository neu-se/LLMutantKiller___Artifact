import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('deprecate function', () => {
    it('should call console.warn when deprecated function is called', () => {
        const warnSpy = jest.spyOn(console, 'warn');
        const deprecatedFunction = Q.deprecate(() => {}, 'deprecatedFunction', 'newFunction');
        deprecatedFunction();
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith('deprecatedFunction is deprecated, use newFunction instead.', expect.any(Error));
    });
});