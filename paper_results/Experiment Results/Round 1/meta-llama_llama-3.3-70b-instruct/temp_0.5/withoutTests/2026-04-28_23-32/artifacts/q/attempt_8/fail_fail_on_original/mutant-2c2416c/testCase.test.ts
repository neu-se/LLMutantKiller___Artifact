import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should log a warning with a stack trace when using a deprecated function', () => {
        const consoleSpy = jest.spyOn(console, 'warn');
        const callback = jest.fn();
        const name = 'test';
        const alternative = 'alternative';
        const proxy = new Proxy(q, {
            get: (target, prop) => {
                if (prop === 'deprecate') {
                    return function(callback, name, alternative) {
                        console.warn(`${name} is deprecated. Use ${alternative} instead.`, new Error('').stack);
                    };
                }
                return target[prop];
            },
        });
        proxy.deprecate(callback, name, alternative);
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(name));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(alternative));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('instead'));
    });
});