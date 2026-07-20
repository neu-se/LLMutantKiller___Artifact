import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should reject when operation is not supported", () => {
        const promise = Q.Promise({
            when: (resolve: any, op: any, args: any) => {
                throw new Error("Promise does not support operation: " + op);
            }
        }, (op: any) => {
            if (op === "when") {
                throw new Error("Promise does not support operation: " + op);
            }
        }, () => ({ state: "pending" }));
        return promise.then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error.message).toBe("Promise does not support operation: when");
        });
    });
});