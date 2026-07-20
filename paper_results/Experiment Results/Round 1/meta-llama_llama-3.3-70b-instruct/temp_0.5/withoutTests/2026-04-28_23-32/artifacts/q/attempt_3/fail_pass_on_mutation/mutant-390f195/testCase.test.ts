import q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should have a stack trace with a minimum stack counter", () => {
        const error = new Error();
        const promise = q.reject(error);
        promise.catch((e: any) => {
            expect(Object.prototype.hasOwnProperty.call(e, "__minimumStackCounter__")).toBe(true);
        });
    });
});