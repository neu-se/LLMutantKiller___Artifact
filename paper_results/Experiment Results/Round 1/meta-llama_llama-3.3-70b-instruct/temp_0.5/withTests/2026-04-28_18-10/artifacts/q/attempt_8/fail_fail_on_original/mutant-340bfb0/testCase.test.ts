import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should correctly handle property name", () => {
        const error = new Error();
        const promise = Q(1);
        makeStackTraceLong(error, promise);
        expect(Object.keys(error)).toContain("__minimumStackCounter__");
    });
});