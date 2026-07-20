import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should handle valueOf correctly for rejected promise', () => {
        const promise = Q.reject("error");
        const inspected = promise.inspect();
        if (inspected.state === "rejected") {
            expect(promise.valueOf()).toBe(promise);
        } else {
            expect(promise.valueOf()).toBe(inspected.value);
        }
    });
});