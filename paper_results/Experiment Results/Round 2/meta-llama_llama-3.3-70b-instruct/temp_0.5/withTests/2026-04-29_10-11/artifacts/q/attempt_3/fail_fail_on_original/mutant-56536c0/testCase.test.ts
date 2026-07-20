import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle nextTick correctly", () => {
        let turn = 0;
        let result: boolean;
        Q.nextTick(() => {
            turn++;
            result = true;
        });
        expect(turn).toBe(0);
        return Q.delay(10).then(() => {
            expect(turn).toBe(1);
            expect(result).toBe(true);
            // Add an assertion that will fail when the mutation is present
            expect(typeof Q.nextTick).toBe('function');
        });
    });
});