import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q promise library", () => {
    it("should have a property __minimumStackCounter__ in the error object", () => {
        const error = new Error();
        const promise = Q.reject(error);
        promise.catch((e: any) => {
            expect(Object.keys(e)).toContain("__minimumStackCounter__");
        });
    });
});