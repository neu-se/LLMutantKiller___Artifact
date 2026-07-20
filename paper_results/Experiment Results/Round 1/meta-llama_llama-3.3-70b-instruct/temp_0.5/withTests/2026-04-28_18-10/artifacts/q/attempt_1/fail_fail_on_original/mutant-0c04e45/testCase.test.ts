import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', function () {
    it('should call generator.next() with the provided argument', function (done) {
        var gen = Q.async(function* (arg) {
            expect(arg).toBe('test');
            done();
        });
        gen('test');
    });
});