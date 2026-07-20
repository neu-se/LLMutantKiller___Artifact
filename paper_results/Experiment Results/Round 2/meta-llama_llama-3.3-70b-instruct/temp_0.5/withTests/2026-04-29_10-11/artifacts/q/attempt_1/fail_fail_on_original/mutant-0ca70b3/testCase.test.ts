import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter stack traces correctly", () => {
        const error = new Error("Test error");
        const originalStack = error.stack;

        const filteredStack = Q.filterStackString(originalStack);

        expect(filteredStack).not.toContain("at Object.<anonymous>");
    });
});