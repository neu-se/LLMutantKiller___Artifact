import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('nearer function', () => {
    it('should return the value of a fulfilled promise', () => {
        const promise = Q(5);
        const nearerValue = Q.nearer(promise);
        expect(nearerValue).toBe(5);
    });

    it('should return the original promise if it is not fulfilled', () => {
        const promise = Q.defer().promise;
        const nearerValue = Q.nearer(promise);
        expect(nearerValue).toBe(promise);
    });
});