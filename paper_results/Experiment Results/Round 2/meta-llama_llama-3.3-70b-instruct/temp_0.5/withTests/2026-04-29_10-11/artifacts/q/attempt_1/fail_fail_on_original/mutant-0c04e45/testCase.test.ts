import { Q } from '../../../../../../../../subject_repositories/q/q';

describe('Q.async', () => {
    it('should handle generator functions correctly', () => {
        function* generator() {
            yield Q.delay(10);
            return 10;
        }

        const asyncGenerator = Q.async(generator);
        return asyncGenerator().then((result) => {
            expect(result).toBe(10);
        });
    });
});