import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const stack = error.stack.split("\n");
        const filteredStack = stack.filter(line => !Q.isInternalFrame(line));
        expect(filteredStack.length).toBeLessThan(stack.length);
    });
});