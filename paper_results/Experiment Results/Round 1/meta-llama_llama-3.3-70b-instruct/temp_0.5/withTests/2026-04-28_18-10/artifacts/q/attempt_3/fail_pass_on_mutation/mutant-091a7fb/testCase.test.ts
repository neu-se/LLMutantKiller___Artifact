import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', function () {
    it('should fulfill with the first resolved promise', function () {
        var deferreds = [Q.defer(), Q.defer()];
        var promises = [deferreds[0].promise, deferreds[1].promise];

        var promise = Q.any(promises);

        deferreds[0].resolve('Fulfilled');

        return Q.delay(250)
          .then(function() {
              expect(promise.isFulfilled()).toBe(true);
              expect(promise.inspect().value).toBe('Fulfilled');
          })
          .timeout(1000);
    });
});