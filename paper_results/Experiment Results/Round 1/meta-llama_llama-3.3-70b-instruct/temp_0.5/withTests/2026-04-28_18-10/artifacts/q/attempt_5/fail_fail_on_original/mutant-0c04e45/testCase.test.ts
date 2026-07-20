import { Q } from "../../../q.js";

describe('Q.async', function () {
    it('should handle exceptions in the generator', function () {
        var gen = Q.async(function* () {
            try {
                throw new Error('test');
            } catch (e) {
                expect((e as Error).message).toBe('test');
                return 'caught';
            }
        });
        return gen().then(function(result: any) {
            expect(result).toBe('caught');
        });
    });
});