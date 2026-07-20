import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should resolve with the first resolved promise", (done) => {
        const promise1 = new Promise((resolve, reject) => {
            setTimeout(() => reject("error1"), 100);
        });
        const promise2 = new Promise((resolve, reject) => {
            setTimeout(() => resolve("success"), 50);
        });
        Q.any([promise1, promise2]).then(
            (value: any) => {
                expect(value).toBe("success");
                done();
            },
            (error: any) => {
                throw new Error("Expected resolution");
            }
        );
    }, 200);
});