import q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should have a stack trace with a minimum stack counter", () => {
        const error = new Error();
        const promise = q.reject(error);
        promise.catch((e: any) => {
            const descriptor = Object.getOwnPropertyDescriptor(e, "__minimumStackCounter__");
            expect(descriptor).toBeDefined();
            expect(descriptor.value).not.toBeUndefined();
            expect(typeof descriptor.value).toBe("number");
        });
    });
});