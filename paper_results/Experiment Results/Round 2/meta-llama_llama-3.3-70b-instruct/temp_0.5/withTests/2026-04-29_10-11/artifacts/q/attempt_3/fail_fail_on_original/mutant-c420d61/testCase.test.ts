import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should correctly handle stack traces", () => {
        const error = new Error();
        const stack = error.stack;
        const filteredStack = Q.filterStackString(stack);
        expect(filteredStack).not.toBeNull();
    });
});