import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nextTick", () => {
    it("should work correctly", () => {
        const isNode = typeof process !== 'undefined' && process.nextTick;
        if (isNode) {
            expect(Q.nextTick).toBeDefined();
        } else {
            expect(Q.nextTick).toBeDefined();
        }
    });
});