import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should reject when an empty array is passed", () => {
        return Q.all([]).then((values) => {
            expect(values).not.toBeDefined();
        }, (error) => {
            expect(error).toBeDefined();
        });
    });
});