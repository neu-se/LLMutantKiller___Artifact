import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should create a promise with unknown state when inspect is undefined', () => {
        const promise = Q.promise(function(resolve, reject, notify) {
            resolve();
        });
        expect(promise.inspect().state).toBe("fulfilled");
    });
});