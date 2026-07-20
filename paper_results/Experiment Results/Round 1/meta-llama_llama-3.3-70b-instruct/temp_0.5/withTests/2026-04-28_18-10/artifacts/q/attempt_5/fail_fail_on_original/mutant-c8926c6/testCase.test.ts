import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should detect the mutation in the nextTick function", () => {
        const nextTick = Q.nextTick;
        const spy = jest.fn();
        nextTick(spy);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(typeof Q.nextTick).toBe('function');
        if (typeof process !== 'undefined' && process.nextTick) {
            expect(Q.nextTick.toString()).toContain('process.nextTick');
        } else {
            expect(Q.nextTick.toString()).not.toContain('process.nextTick');
        }
    });
});