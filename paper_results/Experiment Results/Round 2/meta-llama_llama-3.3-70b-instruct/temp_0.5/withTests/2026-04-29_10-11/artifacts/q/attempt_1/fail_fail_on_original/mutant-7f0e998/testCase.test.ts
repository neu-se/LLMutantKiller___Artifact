import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
    it("should filter out internal frames", () => {
        const error = new Error();
        const stack = error.stack;
        const filteredStack = Q.filterStackString(stack);

        // Check if the filtered stack does not contain any internal frames
        expect(filteredStack).not.toContain("q.js");
    });
});