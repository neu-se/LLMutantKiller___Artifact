import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error with a stack trace when using deprecate', () => {
        const callback = jest.fn();
        const name = 'test';
        const alternative = 'alternative';
        const deprecatedFunction = Q.deprecate(callback, name, alternative);
        const consoleSpy = jest.spyOn(console, 'warn');
        deprecatedFunction();
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(name));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(alternative));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('instead'));
    });
});