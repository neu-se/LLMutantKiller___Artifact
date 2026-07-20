import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.allResolved function", () => {
    it("should not resolve with undefined when all promises are resolved", () => {
        const promises = [Q(1), Q(2), Q(3)];
        return Q.allResolved(promises).then((result) => {
            expect(result).not.toContain(undefined);
        });
    });
});