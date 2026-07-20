import { Q } from "./q.js";

describe('Q', () => {
    it('should have allSettled method', () => {
        expect(Q.allSettled).toBeDefined();
        expect(typeof Q.allSettled).toBe('function');
    });

    it('should call allSettled method without error', () => {
        expect(() => Q.allSettled([])).not.toThrow();
    });
});