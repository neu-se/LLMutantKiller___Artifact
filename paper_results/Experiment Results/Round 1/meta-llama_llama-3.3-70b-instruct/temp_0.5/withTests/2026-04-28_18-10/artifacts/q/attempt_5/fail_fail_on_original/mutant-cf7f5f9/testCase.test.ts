import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when an error occurs in a promise chain", () => {
        const error = new Error("Test error");

        let errorThrown = false;
        try {
            Q(Promise.resolve()).then(() => {
                throw error;
            }).done();
        } catch (e) {
            errorThrown = true;
            expect(e).toBe(error);
        }
        expect(errorThrown).toBe(true);
    });
});