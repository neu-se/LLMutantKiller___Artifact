import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should create a promise with unknown state when inspect is undefined and fallback is defined', () => {
        const fallback = function () {
            return Q.reject("error");
        };
        const promise = Q.Promise({}, fallback, undefined);
        expect(promise.inspect().state).toBe("unknown");
    });
});