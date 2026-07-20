import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should handle valueOf correctly', () => {
        const promise = Q(Promise.resolve(10));
        expect(promise.valueOf()).toBe(promise);
    });
});