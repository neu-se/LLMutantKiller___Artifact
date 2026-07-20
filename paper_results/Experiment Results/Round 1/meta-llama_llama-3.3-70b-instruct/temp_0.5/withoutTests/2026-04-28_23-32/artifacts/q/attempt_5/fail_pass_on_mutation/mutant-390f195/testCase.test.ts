import q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should have a stack trace with a minimum stack counter", () => {
        const error = new Error();
        const promise = q.reject(error);
        promise.catch((e: any) => {
            expect(Object.getOwnPropertyDescriptor(e, "__minimumStackCounter__")).toBeDefined();
            expect(Object.getOwnPropertyDescriptor(e, "__minimumStackCounter__").value).toBeGreaterThan(0);
        });
    });
});