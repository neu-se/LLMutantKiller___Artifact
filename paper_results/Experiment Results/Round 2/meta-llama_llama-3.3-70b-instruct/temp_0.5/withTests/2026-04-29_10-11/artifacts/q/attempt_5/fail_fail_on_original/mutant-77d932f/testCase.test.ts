import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should throw an error when Q is not defined", () => {
        const originalQ = global.Q;
        delete global.Q;
        expect(() => {
            const stackLine = "    at Object.<anonymous> (/Users/username/project/test.js:12:15)";
            const result = Q.getFileNameAndLineNumber(stackLine);
        }).toThrowError();
        global.Q = originalQ;
    });
});