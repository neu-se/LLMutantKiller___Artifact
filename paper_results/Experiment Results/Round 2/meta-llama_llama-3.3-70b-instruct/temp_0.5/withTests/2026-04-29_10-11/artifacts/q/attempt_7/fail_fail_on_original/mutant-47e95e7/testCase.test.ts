import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should handle valueOf correctly for fulfilled promise', () => {
        const promise = Q(10);
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            expect(promise.valueOf()).toBe(inspected.value);
        } else {
            expect(promise.valueOf()).toBe(promise);
        }
    });
});