import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call fail method', () => {
        const error = new Error('Test error');
        const promise = Q.reject(error);
        expect(() => promise.fail()).not.toThrow();
    });
});