import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', function () {
    it('should handle exceptions in the generator', function (done) {
        var gen = Q.async(function* () {
            try {
                yield Q.reject('test');
            } catch (e) {
                expect(e).toBe('test');
                done();
            }
        });
        gen();
    });
});