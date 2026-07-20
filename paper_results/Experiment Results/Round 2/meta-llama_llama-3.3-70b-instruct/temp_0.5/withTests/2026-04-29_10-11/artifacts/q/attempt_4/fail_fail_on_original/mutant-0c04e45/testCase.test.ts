import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle async functions correctly', () => {
        function* generator() {
            try {
                yield Q.delay(10);
            } catch (e) {
                throw e;
            }
            return 10;
        }

        const asyncGenerator = Q.async(function* () {
            try {
                const result = yield Q(generator);
                expect(result).toBe(10);
            } catch (e) {
                expect(true).toBe(false);
            }
        });
        return asyncGenerator();
    });
});