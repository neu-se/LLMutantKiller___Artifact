import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.allResolved function", () => {
    it("should resolve with the correct basis when all promises are resolved", () => {
        const promises = [Q(1), Q(2), Q(3)];
        return Q.allResolved(promises).then((result) => {
            expect(result[0].inspect().value).toBe(1);
            expect(result[1].inspect().value).toBe(2);
            expect(result[2].inspect().value).toBe(3);
        });
    });
});