import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should correctly handle valueOf for a fulfilled promise', () => {
        const promise = Q(10);
        expect(promise.valueOf()).toBe(promise);
    });

    it('should correctly handle valueOf for a rejected promise', () => {
        const error = new Error('Test error');
        const promise = Q.reject(error);
        expect(promise.valueOf()).toBe(promise);
    });
});