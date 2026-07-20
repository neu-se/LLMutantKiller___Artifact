import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when callback is not a function in the finally method', () => {
        const callback = null;
        const promise = Q().finally(callback);
        expect(promise.isRejected()).toBe(true);
    });
});