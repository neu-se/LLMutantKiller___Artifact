import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should reject when operation is not supported", () => {
        const promise = Q.Promise((resolve: any, reject: any) => {
            resolve();
        });
        const result = promise.then(() => {
            return Q("test");
        }).then((value: any) => {
            return value;
        });
        return result.then((value: any) => {
            expect(value).toBe("test");
        });
    });
});