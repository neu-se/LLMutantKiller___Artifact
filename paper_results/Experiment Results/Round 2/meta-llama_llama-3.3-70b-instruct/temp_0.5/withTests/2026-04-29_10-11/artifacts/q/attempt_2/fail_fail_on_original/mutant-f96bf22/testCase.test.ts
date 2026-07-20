import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const originalStack = error.stack;

        Q.makeStackTraceLong(error, Q.defer().promise);

        expect(error.stack).not.toContain("q.js");
    });
});