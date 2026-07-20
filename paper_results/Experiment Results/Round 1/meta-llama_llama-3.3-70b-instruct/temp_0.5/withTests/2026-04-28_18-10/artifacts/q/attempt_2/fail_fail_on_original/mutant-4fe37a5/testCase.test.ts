import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should reject with an error when the operation is not supported", () => {
        const promise = Q(Promise({
            "when": function () {
                return Q.reject(new Error("Test error"));
            }
        }));
        return promise.then(null, (error: any) => {
            expect(error.message).toBe("Test error");
        });
    });
});