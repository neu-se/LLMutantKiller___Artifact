import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise isRejected method', () => {
    it('should return true for a rejected promise and fail for the mutated code', () => {
        const promise = q.reject('Test rejection reason');
        const result = promise.isRejected();
        expect(result).toBeTruthy();
    });
});