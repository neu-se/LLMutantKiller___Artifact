import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const promise = Q.defer().promise;

        // @ts-ignore
        const originalStack = error.stack;
        const originalLines = originalStack.split("\n");

        Q.makeStackTraceLong(error, promise);

        const newStack = error.stack;
        const newLines = newStack.split("\n");

        expect(newLines.length).toBeLessThan(originalLines.length);
    });
});