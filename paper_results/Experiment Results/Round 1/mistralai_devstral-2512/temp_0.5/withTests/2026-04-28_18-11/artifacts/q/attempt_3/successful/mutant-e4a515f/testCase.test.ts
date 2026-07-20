import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor behavior", () => {
    it("should accept a function resolver and create a promise", () => {
        return Q.Promise((resolve) => {
            resolve("success");
        }).then((result) => {
            expect(result).toBe("success");
        });
    });
});