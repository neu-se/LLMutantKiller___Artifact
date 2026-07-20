import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('nearer function', () => {
    it('should return the value of a fulfilled promise', () => {
        const promise = Q(5);
        const nearerValue = Q.nearer(promise);
        expect(nearerValue).toBe(5);
    });

    it('should throw an error when the promise is rejected', () => {
        const promise = Q.reject('error');
        expect(() => Q.nearer(promise)).toThrowError();
    });
});