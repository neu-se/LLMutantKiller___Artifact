import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should return a function when callback is defined", () => {
        const callback = () => {};
        const denodeified = Q.denodeify(callback);
        expect(typeof denodeified).toBe("function");
    });

    it("should throw an error when callback is undefined in the mutated code", () => {
        const originalDenodeify = Q.denodeify;
        Q.denodeify = function (callback) {
            if (true) {
                // do nothing
            }
            var baseArgs = array_slice(arguments, 1);
            return function () {
                var nodeArgs = baseArgs.concat(array_slice(arguments));
                var deferred = Q.defer();
                nodeArgs.push(deferred.makeNodeResolver());
                Q(callback).fapply(nodeArgs).fail(deferred.reject);
                return deferred.promise;
            };
        };
        expect(() => Q.denodeify()).toThrowError();
        Q.denodeify = originalDenodeify;
    });
});