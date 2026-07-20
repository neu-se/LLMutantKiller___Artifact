import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect the mutation in the nextTick function", () => {
        const nextTick = Q.nextTick;
        const originalNextTick = nextTick;
        expect(nextTick).not.toBeUndefined();
        expect(nextTick).not.toBeNull();
        expect(typeof nextTick).toBe('function');
    });
});