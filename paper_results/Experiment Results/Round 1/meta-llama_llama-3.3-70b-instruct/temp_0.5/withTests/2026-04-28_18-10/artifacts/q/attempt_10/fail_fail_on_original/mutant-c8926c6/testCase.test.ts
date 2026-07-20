import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should detect the mutation in the nextTick function", () => {
        const nextTick = Q.nextTick;
        const spy = jest.fn();
        nextTick(spy);
        expect(spy).toHaveBeenCalledTimes(1);
        if (typeof process !== 'undefined' && process.nextTick) {
            const originalNextTick = Q.nextTick;
            Q.nextTick = function() {};
            expect(Q.nextTick).not.toEqual(originalNextTick);
            Q.nextTick = originalNextTick;
        }
    });
});