import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q function', () => {
    it('should result in a fulfilled promise when given a value', () => {
        const promise = Q(5);
        expect(promise.isFulfilled()).toBe(true);
    });

    it('should be the identity when given promise', () => {
        const f = Q.fulfill(5);
        const r = Q.reject(new Error("aaargh"));
        const p = Q.promise(function () { });

        expect(Q(f)).toBe(f);
        expect(Q(r)).toBe(r);
        expect(Q(p)).toBe(p);
    });
});