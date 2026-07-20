import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function', () => {
    it('should have a then method that returns a promise', () => {
        const promise = q(5);
        expect(promise.then).toBeInstanceOf(Function);
        const thenPromise = promise.then(() => {});
        expect(thenPromise).toBeInstanceOf(q.Promise);
    });
});