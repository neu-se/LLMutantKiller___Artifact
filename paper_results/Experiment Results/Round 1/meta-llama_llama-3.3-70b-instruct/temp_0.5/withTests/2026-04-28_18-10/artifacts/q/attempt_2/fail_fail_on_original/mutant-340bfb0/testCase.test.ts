import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should correctly handle error object", () => {
        const error = new Error();
        const promise = Q();
        makeStackTraceLong(error, promise);
        expect(error.stack).toBeDefined();
    });
});