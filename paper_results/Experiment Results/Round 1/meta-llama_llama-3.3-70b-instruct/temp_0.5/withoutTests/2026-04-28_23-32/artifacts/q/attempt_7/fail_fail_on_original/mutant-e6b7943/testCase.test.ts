import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should handle isStopIteration correctly", () => {
        class StopIteration extends Error {}
        const exception = new StopIteration();
        expect(Q.isStopIteration(exception)).toBe(true);
        expect(Q.isStopIteration({})).toBe(false);
    });
});