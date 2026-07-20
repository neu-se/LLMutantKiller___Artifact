describe('Q Promise', () => {
    it('should throw an error when a fallback is not provided for an unsupported operation in the mutated code', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const promise = Q({
            "when": (resolve: (value: any) => void, reject: (reason: any) => void) => {
                resolve("value");
            }
        });
        expect(() => promise.dispatch("unsupportedOperation", null, null)).toThrowError();
    });
});