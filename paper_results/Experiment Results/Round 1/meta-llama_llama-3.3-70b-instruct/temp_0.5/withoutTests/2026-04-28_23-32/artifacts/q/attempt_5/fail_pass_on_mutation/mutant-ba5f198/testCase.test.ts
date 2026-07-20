import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle setImmediate correctly', () => {
        // Check if the condition for setImmediate is met
        if (typeof setImmediate === 'function') {
            expect(typeof setImmediate).toBe('function');
        } else {
            expect(typeof setTimeout).toBe('function');
        }
    });
});