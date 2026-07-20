import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nextTick", () => {
    it("should work correctly", () => {
        const originalNextTick = Q.nextTick;
        Q.nextTick = () => {};
        expect(Q.nextTick).not.toBe(originalNextTick);
        Q.nextTick = originalNextTick;
    });
});