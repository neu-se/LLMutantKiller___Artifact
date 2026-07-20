import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all behavior with pending promises", () => {
    it("should resolve when all promises in the array eventually fulfill", (done) => {
        let firstResolved = false;
        let secondResolved = false;

        const promises = [
            new Q.Promise((resolve) => {
                setTimeout(() => {
                    firstResolved = true;
                    resolve(1);
                }, 10);
            }),
            new Q.Promise((resolve) => {
                setTimeout(() => {
                    secondResolved = true;
                    resolve(2);
                }, 5);
            })
        ];

        Q.all(promises).then((result: any) => {
            expect(result).toEqual([1, 2]);
            expect(firstResolved).toBe(true);
            expect(secondResolved).toBe(true);
            done();
        }).catch((error: any) => {
            done(error);
        });
    });
});