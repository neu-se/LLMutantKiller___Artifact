import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', function () {
    it('should handle exceptions in the generator', function () {
        var gen = Q.async(function* () {
            try {
                throw new Error('test');
            } catch (e) {
                expect(e.message).toBe('test');
                return 'caught';
            }
        });
        return gen().then(function(result) {
            expect(result).toBe('caught');
        });
    });
});