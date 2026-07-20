import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should log a warning with a stack trace when using deprecate', () => {
        const consoleSpy = jest.spyOn(console, 'warn');
        const callback = jest.fn();
        const name = 'test';
        const alternative = 'alternative';
        const deprecatedFunction = (q as any).deprecate(callback, name, alternative);
        deprecatedFunction();
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(name));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(alternative));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('instead'));
    });
});