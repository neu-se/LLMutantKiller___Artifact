import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.denodeify', () => {
    it('should throw an error when callback is undefined in the original code and not throw in the mutated code', () => {
        const originalDenodeify = Q.denodeify;
        const callback = undefined;
        expect(() => originalDenodeify(callback)).toThrowError("Q can't wrap an undefined function");
        
        // Simulate the mutation
        const mutatedDenodeify = function (callback /*...args*/) {
            var baseArgs = array_slice(arguments, 1);
            return function () {
                var nodeArgs = baseArgs.concat(array_slice(arguments));
                var deferred = Q.defer();
                nodeArgs.push(deferred.makeNodeResolver());
                Q(callback).fapply(nodeArgs).fail(deferred.reject);
                return deferred.promise;
            };
        };

        // The mutated code should not throw an error
        expect(() => mutatedDenodeify(callback)()).not.toThrow();
    });
});