import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should test the behavior of valueOf function in promise', () => {
        const promise = Q.defer().promise;
        promise.resolve(10);
        expect(promise.valueOf()).toBe(10);

        const promise2 = Q.defer().promise;
        promise2.resolve(Q(20));
        expect(promise2.valueOf()).toBe(20);
    });
});