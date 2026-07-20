import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise', () => {
        const promise = Q(1);
        expect(promise.then).toBeInstanceOf(Function);
        expect(promise.catch).toBeInstanceOf(Function);
    });

    it('should resolve the promise', () => {
        const promise = Q(1);
        let resolved = false;
        promise.then((value) => {
            resolved = true;
            expect(value).toBe(1);
        });
        expect(resolved).toBe(true);
    });
});