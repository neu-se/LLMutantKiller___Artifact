import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race function", () => {
    it("should resolve with the first resolved promise", () => {
        const promise1 = q.delay(10).then(() => "first");
        const promise2 = q.delay(5).then(() => "second");
        return q.race([promise1, promise2]).then((value: string) => {
            expect(value).toBe("second");
        });
    });
});