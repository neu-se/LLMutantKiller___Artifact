import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', function() {
    it('should call the next function with the correct value', function(done) {
        var asyncFunc = Q.async(function* () {
            var callback = continuer.bind(continuer, "next");
            yield Q(10);
            expect(continuer.bind(continuer, "next").toString()).toContain('next');
        });
        asyncFunc();
        done();
    });
});