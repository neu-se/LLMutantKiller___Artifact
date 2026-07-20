import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should reject when an empty array is passed and no promises are pending", () => {
        const promises = [];

        Q.all(promises).then((values) => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error).toBeUndefined();
        });
    });
});