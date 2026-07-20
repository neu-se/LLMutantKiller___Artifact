import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should filter internal and Node frames from stack traces', () => {
        const error = new Error();
        const stack = error.stack;
        const lines = stack.split("\n");
        const filteredLines = lines.filter(line => !line.includes("at filterStackString") && !line.includes("at module.js:") && !line.includes("at node.js:"));
        const filteredStack = filteredLines.join("\n");

        const qFilteredStack = Q.filterStackString(stack);

        expect(qFilteredStack).toBe(filteredStack);
    });
});