import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', function () {
    it('should reject with the correct error message', function () {
        var deferreds = [Q.defer(), Q.defer()];
        var promises = [deferreds[0].promise, deferreds[1].promise];

        var promise = Q.any(promises);

        var error1 = new Error('Error 1');
        var error2 = new Error('Error 2');

        deferreds[0].reject(error1);
        deferreds[1].reject(error2);

        return promise.then(function() {
            expect(true).toBe(false);
        }, function(error) {
            expect(error.message).toBe('Q can\'t get fulfillment value from any promise, all promises were rejected. Last error message: ' + error2.message);
        });
    });
});