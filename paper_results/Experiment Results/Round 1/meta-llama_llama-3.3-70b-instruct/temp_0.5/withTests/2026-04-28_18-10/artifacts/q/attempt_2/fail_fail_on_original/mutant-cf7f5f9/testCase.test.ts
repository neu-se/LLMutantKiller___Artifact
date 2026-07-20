import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call onerror when an error occurs in a promise chain", () => {
        const error = new Error("Test error");
        let onErrorCalled = false;

        Q.onerror = (err: any) => {
            onErrorCalled = true;
            expect(err).toBe(error);
        };

        return Q().then(() => {
            throw error;
        }).done();
    });
});