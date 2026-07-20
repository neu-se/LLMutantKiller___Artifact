import { Q } from "../../../q.js";

describe('Q.async', function () {
    it('should handle exceptions in the generator', function () {
        var gen = Q.async(function* () {
            try {
                yield Q.reject('test');
            } catch (e) {
                expect(e).toBe('test');
                return 'caught';
            }
        });
        return gen().then(function(result) {
            expect(result).toBe('caught');
        });
    });
});