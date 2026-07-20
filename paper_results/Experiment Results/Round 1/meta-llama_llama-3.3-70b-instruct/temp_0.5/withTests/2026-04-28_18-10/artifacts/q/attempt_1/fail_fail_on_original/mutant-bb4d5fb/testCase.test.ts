import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const originalStack = error.stack;
        const filteredStack = Q.filterStackString(originalStack);
        expect(filteredStack).not.toContain("at Object.<anonymous>");
    });
});