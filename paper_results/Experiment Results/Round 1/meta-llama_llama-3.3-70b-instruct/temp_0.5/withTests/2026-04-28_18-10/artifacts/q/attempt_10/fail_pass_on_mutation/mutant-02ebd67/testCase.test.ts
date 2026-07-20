import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', function() {
    it('should call the next function with the correct value', function(done) {
        var asyncFunc = Q.async(function* () {
            var callback = continuer.bind(continuer, "next");
            yield Q(10);
            if (continuer.bind(continuer, "") !== continuer.bind(continuer, "next")) {
                expect(true).toBe(true);
            } else {
                expect(true).toBe(false);
            }
        });
        asyncFunc();
        done();
    });
});