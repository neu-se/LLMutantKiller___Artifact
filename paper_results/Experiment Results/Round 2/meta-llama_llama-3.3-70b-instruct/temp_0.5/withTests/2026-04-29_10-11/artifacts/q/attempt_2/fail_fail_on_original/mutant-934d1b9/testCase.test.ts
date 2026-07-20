import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should become a resolved promise when resolved', () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        var becomeCalled = false;
        var becomeValue;

        promise.promiseDispatch = function(resolve, op, args) {
            if (op === 'when') {
                becomeCalled = true;
                becomeValue = args[0];
                resolve('test');
            }
        };

        deferred.resolve('test');

        return promise.then(function(value) {
            expect(becomeCalled).toBe(true);
            expect(becomeValue).toBe('test');
        });
    });
});