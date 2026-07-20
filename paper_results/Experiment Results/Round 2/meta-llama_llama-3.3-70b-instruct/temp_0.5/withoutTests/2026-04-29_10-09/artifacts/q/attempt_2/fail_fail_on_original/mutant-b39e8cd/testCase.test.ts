import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q Promise isRejected method', () => {
    it('should return true for a rejected promise', () => {
        const promise = Q.reject('Test rejection reason');
        expect(promise.isRejected()).toBe(true);
    });
});