describe('Q', () => {
    it('should throw an error when fcall is called on a promise with a mutated implementation', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q');
        const promise = Q();
        promise.fcall = function () {};
        expect(() => promise.fcall('test')).toThrowError();
    });
});