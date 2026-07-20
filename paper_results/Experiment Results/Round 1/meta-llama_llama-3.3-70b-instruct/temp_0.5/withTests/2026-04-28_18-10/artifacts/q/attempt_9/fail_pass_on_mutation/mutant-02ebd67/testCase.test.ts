import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', function() {
    it('should call the next function with the correct value', function(done) {
        var asyncFunc = Q.async(function* () {
            var callback = continuer.bind(continuer, "next");
            yield Q(10);
            expect(callback.toString().indexOf("next") > -1).toBe(true);
        });
        asyncFunc();
        done();
    });
});