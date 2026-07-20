import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when an error occurs in a promise chain", () => {
        const error = new Error("Test error");

        expect(() => {
            Q().then(() => {
                throw error;
            }).done();
        }).toThrowError(error);
    });
});