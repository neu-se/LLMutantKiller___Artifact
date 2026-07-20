import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise', () => {
        const promise = q.default(1);
        expect(promise.then).toBeInstanceOf(Function);
        expect(promise.catch).toBeInstanceOf(Function);
    });

    it('should resolve the promise', (done) => {
        const promise = q.default(1);
        promise.then((value) => {
            expect(value).toBe(1);
            done();
        });
    });
});