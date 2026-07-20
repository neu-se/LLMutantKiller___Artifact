import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q Promise isRejected method', () => {
    it('should return true for a rejected promise', () => {
        const promise = Q.reject('Test rejection reason');
        expect(promise.isRejected()).toBe(true);
    });

    it('should return false for a fulfilled promise', () => {
        const promise = Q.resolve('Test fulfillment value');
        expect(promise.isRejected()).toBe(false);
    });

    it('should return false for a pending promise', () => {
        const promise = Q.defer().promise;
        expect(promise.isRejected()).toBe(false);
    });
});