import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function', () => {
    it('should result in a fulfilled promise when given a value', () => {
        const promise = q.Q(5);
        expect(promise.isFulfilled()).toBe(true);
    });

    it('should be the identity when given promise', () => {
        const f = q.Q.fulfill(5);
        const r = q.Q.reject(new Error("aaargh"));
        const p = q.Q.promise(function () { });

        expect(q.Q(f)).toBe(f);
        expect(q.Q(r)).toBe(r);
        expect(q.Q(p)).toBe(p);
    });
});