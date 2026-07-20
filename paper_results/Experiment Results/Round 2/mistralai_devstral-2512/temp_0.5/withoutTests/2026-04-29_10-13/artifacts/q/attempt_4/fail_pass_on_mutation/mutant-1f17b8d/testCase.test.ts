import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all behavior with mixed promises and values", () => {
    it("should resolve when given an array containing both promises and immediate values", (done) => {
        const promises = [
            Q.resolve(1),
            2,
            Q.resolve(3)
        ];
        Q.all(promises).then((result: any) => {
            expect(result).toEqual([1, 2, 3]);
            done();
        }).catch((error: any) => {
            done(error);
        });
    });
});