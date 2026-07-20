import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return the promise itself when the inspected state is pending or rejected', () => {
        const promise = Q.defer().promise;
        const inspected = promise.inspect();
        if (inspected.state === "pending" || inspected.state === "rejected") {
            expect(promise.valueOf()).toBe(promise);
        } else {
            expect(promise.valueOf()).not.toBe(promise);
        }
    });
});