import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', function () {
    it('rejects after all promises are rejected', function () {
        var deferreds = [Q.defer(), Q.defer()];
        var promises = [deferreds[0].promise, deferreds[1].promise];
        var promise = Q.any(promises);
        
        deferreds[0].reject("Error 1");
        deferreds[1].reject("Error 2");

        return promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: Error 2");
        });
    });
});