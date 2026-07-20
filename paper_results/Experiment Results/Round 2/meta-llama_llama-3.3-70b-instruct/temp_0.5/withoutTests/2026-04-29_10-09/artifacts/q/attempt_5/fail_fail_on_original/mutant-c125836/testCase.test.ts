import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.allResolved function", () => {
    it("should reject when any of the promises are rejected", () => {
        const promises = [Q(1), Q.reject(2), Q(3)];
        return Q.allResolved(promises).then((result) => {
            expect(result).toBeUndefined();
        }).catch((error) => {
            expect(error).toBeUndefined();
        });
    });
});