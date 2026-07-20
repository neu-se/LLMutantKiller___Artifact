import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise', () => {
        const promise = Q(true);
        expect(promise.isFulfilled()).toBe(true);
        const snapshot = promise.inspect();
        if ((snapshot as any).state === "fulfilled") {
            expect((snapshot as any).value).toBe(true);
        } else {
            expect(true).toBe(false);
        }
    });
});