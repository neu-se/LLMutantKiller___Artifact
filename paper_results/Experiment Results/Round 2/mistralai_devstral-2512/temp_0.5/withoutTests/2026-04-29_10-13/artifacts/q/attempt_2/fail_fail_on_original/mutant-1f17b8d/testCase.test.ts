import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all behavior with promises", () => {
    it("should resolve when all promises in the array are fulfilled", (done) => {
        const promises = [
            Q.resolve(1),
            Q.resolve(2),
            Q.resolve(3)
        ];
        Q.all(promises).then((result) => {
            expect(result).toEqual([1, 2, 3]);
            done();
        }).catch((error: any) => {
            done(error);
        });
    });
});