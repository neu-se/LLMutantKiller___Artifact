import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should throw an error when given a non-function resolver", () => {
        expect(() => Q((function () {
            return Q(function (resolve) {
                resolve();
            });
        } as any))).toThrowError();
    });
});