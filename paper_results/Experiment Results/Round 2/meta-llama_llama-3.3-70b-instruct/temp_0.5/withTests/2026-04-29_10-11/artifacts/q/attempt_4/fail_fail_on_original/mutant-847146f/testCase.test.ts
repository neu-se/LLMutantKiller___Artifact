import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call catch method with a rejected promise', () => {
        const error = new Error('Test error');
        const promise = Q.reject(error);
        const result = promise.catch((err) => {
            return err;
        });
        expect(result).rejects.toThrow(error);
    });
});