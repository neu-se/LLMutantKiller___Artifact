import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('nearer function should return the fulfillment value of a fulfilled promise', () => {
        const promise = Q(42);
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            expect(Q.nearer(promise)).not.toBeUndefined();
        } else {
            expect(false).toBe(true); // This should not happen if the promise is fulfilled
        }
    });
});