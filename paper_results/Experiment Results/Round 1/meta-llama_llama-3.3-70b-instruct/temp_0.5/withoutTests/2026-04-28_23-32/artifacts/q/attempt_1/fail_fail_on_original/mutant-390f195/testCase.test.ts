import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should have a stack trace with a minimum stack counter", () => {
        const error = new Error();
        const promise = Q.reject(error);
        promise.catch((e) => {
            expect(e.__minimumStackCounter__).toBeGreaterThan(0);
        });
    });
});