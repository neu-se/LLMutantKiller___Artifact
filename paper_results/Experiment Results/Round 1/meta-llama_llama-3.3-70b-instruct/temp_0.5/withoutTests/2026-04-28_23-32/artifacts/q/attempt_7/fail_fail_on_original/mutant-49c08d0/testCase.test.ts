import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should create a promise with unknown state when inspect is undefined', () => {
        const promise = Q.Promise({}, function(resolver, rejecter, notify) {
            resolver();
        });
        const inspect = function () {
            return { state: "rejected" };
        };
        const promise2 = Q.Promise({}, function(resolver, rejecter, notify) {
            resolver();
        }, inspect);
        expect(promise.inspect().state).toBe("unknown");
        expect(promise2.inspect().state).toBe("rejected");
    });
});