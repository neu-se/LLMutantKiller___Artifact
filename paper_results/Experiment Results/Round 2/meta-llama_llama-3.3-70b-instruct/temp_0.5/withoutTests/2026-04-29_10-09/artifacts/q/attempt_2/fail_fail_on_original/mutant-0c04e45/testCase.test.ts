import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', () => {
    it('should handle exceptions correctly', () => {
        const asyncFunction = Q.async(function* () {
            try {
                yield Promise.resolve();
            } catch (e) {
                throw e;
            }
        });
        expect(asyncFunction()).resolves.toBeNull();
    });
});