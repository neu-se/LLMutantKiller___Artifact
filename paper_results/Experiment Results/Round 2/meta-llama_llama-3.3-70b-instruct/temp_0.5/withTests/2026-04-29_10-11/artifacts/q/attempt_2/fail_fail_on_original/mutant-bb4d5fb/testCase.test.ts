import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly filter internal frames from stack traces", () => {
        const originalIsInternalFrame = Q.isInternalFrame;
        Q.isInternalFrame = function(line: string) {
            return false;
        };

        const error = new Error();
        const stack = error.stack;
        const filteredStack = Q.filterStackString(stack);
        expect(filteredStack).toBe(stack);

        Q.isInternalFrame = originalIsInternalFrame;
    });
});