import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should throw an error when callback is undefined in the original code but not in the mutated code", () => {
        const originalCode = Q.denodeify;
        const mutatedCode = function(callback) {
            if (callback === undefined) {
                return function() {};
            }
            var baseArgs = Array.prototype.slice.call(arguments, 1);
            return function () {
                var nodeArgs = baseArgs.concat(Array.prototype.slice.call(arguments));
                var deferred = Q.defer();
                nodeArgs.push(deferred.makeNodeResolver());
                Q(callback).fapply(nodeArgs).fail(deferred.reject);
                return deferred.promise;
            };
        };

        expect(() => originalCode(undefined)).toThrowError();
        expect(() => mutatedCode(undefined)()).not.toThrowError();
    });
});