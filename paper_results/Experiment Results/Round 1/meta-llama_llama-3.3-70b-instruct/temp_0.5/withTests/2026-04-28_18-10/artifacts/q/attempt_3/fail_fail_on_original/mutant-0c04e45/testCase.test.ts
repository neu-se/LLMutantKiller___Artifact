import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', function () {
    it('should handle exceptions in the generator', function () {
        var called = false;
        var gen = Q.async(function* () {
            try {
                yield Q.reject('test');
            } catch (e) {
                called = true;
                expect(e).toBe('test');
            }
        });
        gen();
        expect(called).toBe(true);
    });
});