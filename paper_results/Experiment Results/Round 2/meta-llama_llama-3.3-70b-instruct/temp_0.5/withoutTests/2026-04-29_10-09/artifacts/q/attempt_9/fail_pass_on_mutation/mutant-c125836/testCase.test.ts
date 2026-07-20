import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.allResolved function", () => {
    it("should resolve with an array of the same length as the input array", () => {
        const promises = [Q(1), Q(2), Q(3)];
        return Q.allResolved(promises).then((result) => {
            expect(result.length).toBe(promises.length);
        });
    });
});