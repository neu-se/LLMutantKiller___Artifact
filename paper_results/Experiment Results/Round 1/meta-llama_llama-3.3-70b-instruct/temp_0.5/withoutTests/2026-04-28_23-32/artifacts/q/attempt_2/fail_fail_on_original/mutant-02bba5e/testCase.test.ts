import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle null error in makeStackTraceLong", () => {
        const error = null;
        const promise = Q.resolve();
        expect(() => makeStackTraceLong(error, promise)).not.toThrow();
    });
});