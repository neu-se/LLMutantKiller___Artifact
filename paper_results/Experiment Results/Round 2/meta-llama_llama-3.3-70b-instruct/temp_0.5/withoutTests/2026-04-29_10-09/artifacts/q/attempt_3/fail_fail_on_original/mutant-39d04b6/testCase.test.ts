import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should throw an error when inspect function is not provided", () => {
        const promise = Q(Promise({}));
        expect(() => promise.inspect()).toThrowError();
    });
});