import { Q } from "../../../q.js";

describe("Q library", () => {
    it("should handle nextTick correctly", () => {
        let called = false;
        Q.nextTick(() => {
            called = true;
        });
        expect(called).toBe(false);
    });
});