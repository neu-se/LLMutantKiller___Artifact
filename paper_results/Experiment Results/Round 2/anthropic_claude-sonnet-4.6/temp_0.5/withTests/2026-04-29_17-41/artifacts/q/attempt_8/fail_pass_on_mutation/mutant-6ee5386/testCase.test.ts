import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("promise then callback called only once", () => {
    it("should only call fulfilled callback once even if promise dispatches multiple times", () => {
        let callCount = 0;
        const deferred = Q.defer();
        
        const promise = deferred.promise.then(function(val: any) {
            callCount++;
            return val;
        });
        
        deferred.resolve(42);
        
        return Q.delay(50).then(function() {
            expect(callCount).toBe(1);
        });
    });
});