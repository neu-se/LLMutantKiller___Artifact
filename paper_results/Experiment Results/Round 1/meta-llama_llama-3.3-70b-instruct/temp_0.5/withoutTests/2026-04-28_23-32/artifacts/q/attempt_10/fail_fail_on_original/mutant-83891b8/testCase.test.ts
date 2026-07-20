import { Q } from "../q.js";

describe('Q', () => {
    it('should return the fulfillment value of a promise when its state is fulfilled', () => {
        const promise = Q.resolve('fulfilled value');
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            const nearerValue = Q.nearer(promise);
            expect(nearerValue).toBe(inspected.value);
        } else {
            expect(true).toBe(false);
        }
        const rejectedPromise = Q.reject('rejected value');
        const inspectedRejected = rejectedPromise.inspect();
        if (inspectedRejected.state === "rejected") {
            const nearerRejectedValue = Q.nearer(rejectedPromise);
            expect(nearerRejectedValue).toBe(rejectedPromise);
        } else {
            expect(true).toBe(false);
        }
    });
});