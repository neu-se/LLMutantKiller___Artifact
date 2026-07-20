import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return the value when the promise is fulfilled and not pending or rejected', () => {
        const promise = Q.defer().promise;
        const inspected = promise.inspect();
        if (inspected.state === "pending" || inspected.state === "rejected") {
            expect(promise.valueOf()).toBe(promise);
        } else {
            promise.resolve(5);
            expect(promise.valueOf()).not.toBe(promise);
        }
    });
});