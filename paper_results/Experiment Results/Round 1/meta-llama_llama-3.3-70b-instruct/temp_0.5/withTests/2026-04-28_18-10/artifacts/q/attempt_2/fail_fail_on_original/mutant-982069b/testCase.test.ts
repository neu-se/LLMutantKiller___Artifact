import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const error = new Error();
        const stack = error.stack;
        const filteredStack = Q.filterStackString(stack);
        const lines = stack.split("\n");
        const desiredLines = lines.filter(line => !Q.isInternalFrame(line));
        expect(filteredStack).toBe(desiredLines.join("\n"));
    });
});