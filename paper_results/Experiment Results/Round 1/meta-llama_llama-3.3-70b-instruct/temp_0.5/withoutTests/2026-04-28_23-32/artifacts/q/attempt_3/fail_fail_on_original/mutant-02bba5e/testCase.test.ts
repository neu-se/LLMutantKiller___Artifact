import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should make a long stack trace only if the error is not null", () => {
        const error = new Error();
        const promise = Q.resolve();
        makeStackTraceLong(error, promise);
        expect(error.stack).toBeDefined();
        expect(makeStackTraceLong(null, promise)).toBeUndefined();
    });
});