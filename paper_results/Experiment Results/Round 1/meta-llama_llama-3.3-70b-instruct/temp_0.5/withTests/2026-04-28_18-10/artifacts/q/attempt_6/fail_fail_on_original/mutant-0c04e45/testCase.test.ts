import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', function () {
    it('should handle exceptions in the generator', function () {
        var gen = Q.async(function* () {
            try {
                throw new Error('test');
            } catch (e) {
                return Q.reject(e);
            }
        });
        return gen().then(function(result: any) {
            expect(result).toBeUndefined();
        }, function(error: any) {
            expect(error.message).toBe('test');
        });
    });
});