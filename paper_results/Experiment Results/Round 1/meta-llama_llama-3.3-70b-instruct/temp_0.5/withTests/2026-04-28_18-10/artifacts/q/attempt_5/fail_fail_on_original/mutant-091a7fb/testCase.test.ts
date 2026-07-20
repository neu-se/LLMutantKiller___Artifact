import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', function () {
    it('should reject after all promises are rejected', function () {
        var deferreds = [Q.defer(), Q.defer()];
        var promises = [deferreds[0].promise, deferreds[1].promise];

        var promise = Q.any(promises);

        deferreds[0].reject('Rejected');
        deferreds[1].reject('Rejected');

        return Q.delay(250, true)
          .then(function() {
              expect(promise.isRejected()).toBe(true);
          })
          .timeout(1000);
    });
});