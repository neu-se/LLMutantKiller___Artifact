import { Q } from "../../../q.js";

describe("makeStackTraceLong function", () => {
    it("should make the stack trace long", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        Q.makeStackTraceLong(error, promise);
        expect(error.stack).toContain("makeStackTraceLong");
    });
});