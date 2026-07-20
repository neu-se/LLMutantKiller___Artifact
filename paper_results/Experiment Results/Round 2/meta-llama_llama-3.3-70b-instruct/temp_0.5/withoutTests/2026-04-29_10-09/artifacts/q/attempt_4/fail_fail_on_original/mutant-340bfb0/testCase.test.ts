import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q promise library", () => {
    it("should correctly define a property on an error object", () => {
        const error = new Error();
        const promise = Q.reject(error);
        promise.catch((e) => {
            expect(Object.keys(e)).toContain("__minimumStackCounter__");
        });
    });
});