import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const originalStack = error.stack;
        const filteredStack = Q.makeStackTraceLong(error, Q());
        expect(filteredStack).not.toEqual(originalStack);
    });
});