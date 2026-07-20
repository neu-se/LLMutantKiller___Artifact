import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise for an immediate reference', () => {
        const promise = Q(5);
        expect(promise.isFulfilled()).toBe(true);
    });

    it('should handle window and self correctly', () => {
        const global = typeof window!== "undefined"? window : self;
        expect(global).toBeDefined();
    });
});