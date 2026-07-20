import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.allResolved function", () => {
    it("should reject when an empty array is passed", () => {
        const promises = [];
        return Q.allResolved(promises).then((result) => {
            throw new Error("Expected Q.allResolved to reject");
        }).catch((error) => {
            expect(error).toBeInstanceOf(TypeError);
        });
    });
});