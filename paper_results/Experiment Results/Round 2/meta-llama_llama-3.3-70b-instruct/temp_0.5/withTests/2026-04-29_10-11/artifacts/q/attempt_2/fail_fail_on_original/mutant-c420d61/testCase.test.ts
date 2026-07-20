import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should throw an error when isNodeFrame is always false", () => {
        const originalIsNodeFrame = Q.isNodeFrame;
        Q.isNodeFrame = () => false;

        const error = new Error();
        const stack = error.stack;
        const filteredStack = Q.filterStackString(stack);

        Q.isNodeFrame = originalIsNodeFrame;

        expect(filteredStack).toBe(stack);
    });
});