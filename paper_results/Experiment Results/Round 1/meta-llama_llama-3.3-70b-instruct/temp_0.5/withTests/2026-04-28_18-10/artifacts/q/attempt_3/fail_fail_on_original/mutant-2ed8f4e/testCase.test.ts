import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const stackString = error.stack;
        const filteredStackString = Q.filterStackString(stackString);
        expect(filteredStackString).not.toEqual(stackString);
    });
});