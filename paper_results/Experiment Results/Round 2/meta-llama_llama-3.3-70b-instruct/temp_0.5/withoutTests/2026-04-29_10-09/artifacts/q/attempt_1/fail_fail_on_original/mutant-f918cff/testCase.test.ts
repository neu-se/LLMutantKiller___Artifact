import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should reject the promise when an exception is thrown in the promise dispatch", () => {
        const promise = Q({
            "when": function (resolve, op, args) {
                throw new Error("Test error");
            }
        });
        return promise.then(() => {
            throw new Error("Expected promise to be rejected");
        }, (error) => {
            expect(error.message).toBe("Test error");
        });
    });
});