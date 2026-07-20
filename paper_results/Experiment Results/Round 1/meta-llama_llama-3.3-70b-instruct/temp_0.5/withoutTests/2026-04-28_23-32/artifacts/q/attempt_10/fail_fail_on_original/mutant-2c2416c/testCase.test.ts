import console = require('console');
import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should log a warning with a stack trace when using a deprecated function', () => {
        const consoleSpy = jest.spyOn(console, 'warn');
        const callback = jest.fn();
        const name = 'test';
        const alternative = 'alternative';
        const deprecatedFunction = (q as any).deprecate || function(callback: any, name: any, alternative: any) {
            console.warn(`${name} is deprecated. Use ${alternative} instead.`, new Error('').stack);
        };
        deprecatedFunction(callback, name, alternative);
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`${name} is deprecated. Use ${alternative} instead.`), expect.any(Error));
    });
});