import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should have a stack trace with a minimum stack counter", () => {
        const error = new Error();
        const promise = Q.reject(error);
        expect(promise.catch((e) => {
            return e.__minimumStackCounter__;
        })).resolves.toBeGreaterThan(0);
    });
});