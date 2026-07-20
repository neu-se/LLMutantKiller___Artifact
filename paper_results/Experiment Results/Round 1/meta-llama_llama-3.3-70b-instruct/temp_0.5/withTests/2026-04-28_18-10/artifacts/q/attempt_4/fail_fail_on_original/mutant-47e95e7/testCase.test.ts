import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should correctly handle valueOf for a promise', () => {
        const promise = Q(10);
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            expect(promise.valueOf()).toBe(promise);
        } else if (inspected.state === "rejected") {
            expect(promise.valueOf()).toBe(promise);
        }
    });
});