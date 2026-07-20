import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have a 'catch' property on the Q object", () => {
        expect(Q["catch"]).toBeDefined();
        expect(typeof Q["catch"]).toBe("function");
    });
});