import { Q } from "./q.js";

describe("q", () => {
    it("should throw an error when Q.makeStackTraceLong is called with a stack trace that has no file name and line number", () => {
        const error = new Error("Test error");
        error.stack = "   at func1\n   at func2";
        expect(() => Q.makeStackTraceLong(error, Q())).toThrowError();
    });
});