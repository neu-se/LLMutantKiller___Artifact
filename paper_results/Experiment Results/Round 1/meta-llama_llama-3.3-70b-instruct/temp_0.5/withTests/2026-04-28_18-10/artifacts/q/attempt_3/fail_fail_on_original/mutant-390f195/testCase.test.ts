import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of makeStackTraceLong function", () => {
        const error = new Error("Test error");
        const promise = Q();
        Q.makeStackTraceLong(error, promise);
        expect(error.stack).toBeTruthy();
    });
});