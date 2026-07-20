import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return the fulfillment value of a promise when using Q.nearer', () => {
        const promise = Q.resolve(5);
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            expect(Q.nearer(promise)).toBe(inspected.value);
        } else {
            expect(Q.nearer(promise)).not.toBe(inspected.value);
        }
    });
});