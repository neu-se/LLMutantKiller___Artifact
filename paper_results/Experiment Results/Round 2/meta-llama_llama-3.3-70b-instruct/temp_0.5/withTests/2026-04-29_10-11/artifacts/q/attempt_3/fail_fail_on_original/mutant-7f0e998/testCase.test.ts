import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
    it("should filter out internal frames", () => {
        const error = new Error();
        const stack = error.stack;
        if (stack) {
            const lines = stack.split("\n");
            const internalFrame = lines.find(line => line.includes("q.js"));
            const filteredStack = Q.filterStackString(stack);

            // Check if the filtered stack does not contain any internal frames
            expect(filteredStack).not.toContain(internalFrame);
        }
    });
});