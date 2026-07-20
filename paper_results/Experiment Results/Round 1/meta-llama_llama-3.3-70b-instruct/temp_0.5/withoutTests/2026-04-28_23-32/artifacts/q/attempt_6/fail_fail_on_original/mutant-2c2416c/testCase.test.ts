import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should log a warning with a stack trace when using a deprecated function', () => {
        const consoleSpy = jest.spyOn(console, 'warn');
        const promise = q.defer().promise;
        const deprecatedFunction = promise.fin;
        deprecatedFunction(() => {});
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Q can\'t apply finally callback'));
    });
});