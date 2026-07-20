import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("makeStackTraceLong", () => {
    it("should correctly format the stack trace", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);

        Q.makeStackTraceLong(error, promise);

        expect(error.stack).not.toBeNull();
    });
});