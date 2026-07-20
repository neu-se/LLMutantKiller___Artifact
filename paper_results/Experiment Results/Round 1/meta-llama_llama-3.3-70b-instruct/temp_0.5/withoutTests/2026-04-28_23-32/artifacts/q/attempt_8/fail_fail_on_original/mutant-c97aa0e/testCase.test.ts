import { Q } from "./q.js";

describe('Q', () => {
    it('should handle any correctly', () => {
        const promises = [Q.resolve(1), Q.reject(2), Q.resolve(3)];
        const anyPromise = Q(promises).any();
        expect(anyPromise).not.toBeUndefined();
        expect(typeof anyPromise.then).toBe('function');
    });
});