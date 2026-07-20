import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor with non-function resolver", () => {
    it("should reject when resolver is not a function", () => {
        return Q.Promise("not a function")
            .then(
                () => {
                    throw new Error("Promise should have been rejected");
                },
                (reason) => {
                    expect(reason).toBeInstanceOf(Error);
                }
            );
    });
});