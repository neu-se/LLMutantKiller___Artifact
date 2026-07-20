import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q promise library", () => {
    it("should correctly define a property on an error object", () => {
        const error = new Error();
        Q.makeStackTraceLong(error, Q.reject(error));
        expect(Object.keys(error)).toContain("__minimumStackCounter__");
    });
});