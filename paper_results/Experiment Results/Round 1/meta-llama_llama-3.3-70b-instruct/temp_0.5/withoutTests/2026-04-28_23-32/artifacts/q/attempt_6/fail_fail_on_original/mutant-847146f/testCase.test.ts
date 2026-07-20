import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have a catch method that is a function', () => {
        const promise = Q.reject('test');
        expect(typeof promise.catch).toBe('function');
    });
});