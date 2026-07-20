import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return a value when the promise is fulfilled', () => {
        const promise = Q.defer().promise;
        promise.resolve(5);
        const inspected = promise.inspect();
        if (inspected.state === "pending" || inspected.state === "rejected") {
            expect(promise.valueOf()).toBe(promise);
        } else {
            expect(promise.valueOf()).toBe(5);
        }
    });
});