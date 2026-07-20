import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle null error', () => {
        const promise = Q.reject(null);
        const result = promise.catch((err: any) => {
            expect(err).toBeNull();
            try {
                err.stack;
                expect(true).toBe(false); // This should not be reached
            } catch (e) {
                expect(e).toBeInstanceOf(TypeError);
            }
        });
        return result;
    });
});