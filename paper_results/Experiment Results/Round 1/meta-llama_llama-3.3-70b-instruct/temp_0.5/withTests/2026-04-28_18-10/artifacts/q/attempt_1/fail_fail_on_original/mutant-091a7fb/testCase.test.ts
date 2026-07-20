import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', function () {
    it('should reject after all promises are rejected', function () {
        var deferreds = [Q.defer(), Q.defer()];
        var promises = [deferreds[0].promise, deferreds[1].promise];

        var promise = Q.any(promises);
        var expectedError;

        for (var index = 0; index < deferreds.length; index++) {
            var deferred = deferreds[index];
            (function() {
              deferred.reject();
            })();
        }

        return Q.delay(250)
          .then(function() {
              expect(promise.isRejected()).toBe(true);
              expect(promise.inspect().reason.message)
                .toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: ");
          })
          .timeout(1000);
    });
});