import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q.async', () => {
    it('should handle generator functions correctly', () => {
        function* generator() {
            try {
                yield Q.delay(10);
            } catch (e) {
                throw e;
            }
            return 10;
        }

        const asyncGenerator = Q.async(generator);
        return asyncGenerator().then((result: any) => {
            expect(result).toBe(10);
        });
    });
});