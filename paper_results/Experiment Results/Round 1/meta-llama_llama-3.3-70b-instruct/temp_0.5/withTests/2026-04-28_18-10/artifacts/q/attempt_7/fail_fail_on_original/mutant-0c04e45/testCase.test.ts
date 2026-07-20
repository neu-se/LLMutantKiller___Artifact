import { Q } from "../../../q.js";

describe('Q.async', function () {
    it('should handle exceptions in the generator', function () {
        var gen = Q.async(function* () {
            try {
                throw new Error('test');
            } catch (e) {
                expect((e as Error).message).toBe('test');
                throw e;
            }
        });
        return gen().then(function(result: any) {
            expect(result).toBeUndefined();
        }, function(error: any) {
            expect((error as Error).message).toBe('test');
        });
    });
});