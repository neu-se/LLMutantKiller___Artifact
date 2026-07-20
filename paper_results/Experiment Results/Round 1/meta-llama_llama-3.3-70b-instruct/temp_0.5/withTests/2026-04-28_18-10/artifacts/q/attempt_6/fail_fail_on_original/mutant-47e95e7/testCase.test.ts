import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should correctly handle Promise.prototype.valueOf for a fulfilled promise', () => {
        const promise = Q(10);
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            expect(promise.valueOf()).toBe(promise);
        } else if (inspected.state === "rejected") {
            expect(promise.valueOf()).toBe(promise);
        }
    });
});