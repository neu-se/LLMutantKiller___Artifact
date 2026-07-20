import { Q } from "../../../q.js";

describe('Q', () => {
    it('should warn when using deprecated functions', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn');
        const deprecatedFunction = Q.deprecate(function () {}, 'deprecatedFunction', 'newFunction');
        deprecatedFunction();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith('deprecatedFunction is deprecated, use newFunction instead.', expect.any(Error));
    });
});