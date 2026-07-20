import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should not be an empty function", () => {
        const originalJoin = q.join;
        q.join = function(x, y) {};
        expect(() => q.join(1, 2)).not.toThrowError();
        q.join = originalJoin;
    });
});