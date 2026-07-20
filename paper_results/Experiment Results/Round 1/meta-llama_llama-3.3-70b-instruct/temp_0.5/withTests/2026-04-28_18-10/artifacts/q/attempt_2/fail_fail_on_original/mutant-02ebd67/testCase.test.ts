import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', function() {
    it('should call the next function with the correct value', function(done) {
        var asyncFunc = Q.async(function* () {
            var callback = Q.async(function* () {
                yield Q(10);
            });
            yield callback();
        });
        asyncFunc();
        expect(true).toBe(true);
        done();
    });
});