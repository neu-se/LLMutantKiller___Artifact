import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should create a promise with unknown state when inspect is undefined and fallback is defined', () => {
        const promise = Q.Promise({}, function() {
            return Q.reject("error");
        }, function() {
            return { state: "rejected" };
        });
        expect(promise.inspect().state).toBe("rejected");
    });
});