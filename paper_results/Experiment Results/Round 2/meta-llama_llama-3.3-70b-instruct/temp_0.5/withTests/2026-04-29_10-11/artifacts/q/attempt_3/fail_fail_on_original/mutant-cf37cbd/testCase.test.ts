import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should correctly handle the mutation in getFileNameAndLineNumber", () => {
        const error = new Error();
        error.stack = "at myFunction (myFile.js:10:20)";
        const promise = {
            stack: "at myFunction (myFile.js:10:20)",
            stackCounter: 1,
            source: null
        };
        Q.makeStackTraceLong(error, promise);
        expect(error.stack).toContain("myFile.js:10");
    });
});