import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function', () => {
    it('should result in a fulfilled promise when given a value', () => {
        const promise = q(5);
        expect(promise.isFulfilled()).toBe(true);
    });

    it('should be the identity when given promise', () => {
        const f = q.fulfill(5);
        const r = q.reject(new Error("aaargh"));
        const p = q.promise(function () { });

        expect(q(f)).toBe(f);
        expect(q(r)).toBe(r);
        expect(q(p)).toBe(p);
    });
});