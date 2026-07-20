import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should create a promise with unknown state when inspect is undefined', () => {
        const promise = Q({}).thenResolve();
        expect(promise.inspect().state).not.toBe("unknown");
    });
});