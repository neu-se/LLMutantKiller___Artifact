import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should log a warning with a stack trace when using a deprecated function', () => {
        const consoleSpy = jest.spyOn(console, 'warn');
        const deprecateSpy = jest.fn();
        const proxy = new Proxy(q, {
            get: (target, prop) => {
                if (prop === 'deprecate') {
                    return deprecateSpy;
                }
                return target[prop];
            },
        });
        const callback = () => {};
        const name = 'test';
        const alternative = 'alternative';
        proxy.deprecate(callback, name, alternative)();
        expect(deprecateSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(name));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(alternative));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('instead'));
    });
});