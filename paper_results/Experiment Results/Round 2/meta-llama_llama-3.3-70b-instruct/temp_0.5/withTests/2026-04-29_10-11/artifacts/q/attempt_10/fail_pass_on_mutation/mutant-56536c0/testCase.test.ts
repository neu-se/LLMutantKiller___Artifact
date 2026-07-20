import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle nextTick correctly", () => {
        let turn = 0;
        q.nextTick(() => {
            turn++;
        });
        expect(turn).toBe(0);
        return q.delay(10, 10).then(() => {
            expect(turn).toBe(1);
            if (typeof q.nextTick === 'function') {
                expect(q.nextTick.toString()).toContain("function");
            } else {
                throw new Error("nextTick is not a function");
            }
        });
    });
});