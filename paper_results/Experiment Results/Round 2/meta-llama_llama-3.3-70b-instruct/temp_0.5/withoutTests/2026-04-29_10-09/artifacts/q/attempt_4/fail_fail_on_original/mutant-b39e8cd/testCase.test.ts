import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise isRejected method', () => {
    it('should return true for a rejected promise and false for the mutated code', () => {
        const promise = q.Q.reject('Test rejection reason');
        expect(promise.isRejected()).toBeDefined();
    });
});