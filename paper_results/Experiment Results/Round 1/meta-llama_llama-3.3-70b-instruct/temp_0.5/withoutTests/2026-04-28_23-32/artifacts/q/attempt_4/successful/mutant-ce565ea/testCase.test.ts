import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return the inspected value when the inspected state is fulfilled', () => {
        const promise = Q.resolve('test');
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            expect(promise.valueOf()).toBe(inspected.value);
        } else {
            expect(promise.valueOf()).not.toBe(promise);
        }
    });
});