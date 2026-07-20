import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', function() {
    it('should call the next function with the correct value', function(done) {
        var asyncFunc = Q.async(function* () {
            var value = yield Q(10);
            expect(value).toBe(10);
            done();
        });
        asyncFunc();
    });
});