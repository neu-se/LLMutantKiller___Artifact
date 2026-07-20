import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        var promise = Q.resolve();
        try {
            promise[""](() => {});
        } catch (e) {
            expect(e.message).toBe("Q can't apply finally callback");
        }
    });
});