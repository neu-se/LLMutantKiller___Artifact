import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle nextTick correctly", () => {
        let turn = 0;
        Q.nextTick(() => {
            turn++;
        });
        expect(turn).toBe(0);
        return Q.delay(10).then(() => {
            expect(turn).toBe(1);
            expect(Q.nextTick).toBeInstanceOf(Function);
        });
    });
});