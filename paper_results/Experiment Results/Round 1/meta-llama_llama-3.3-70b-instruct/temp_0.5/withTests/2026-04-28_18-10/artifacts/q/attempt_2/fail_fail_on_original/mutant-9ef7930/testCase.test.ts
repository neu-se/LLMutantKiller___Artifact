import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race function", () => {
    it("should resolve with the first resolved promise", () => {
        const promise1 = Q.delay(10).then(() => "first");
        const promise2 = Q.delay(5).then(() => "second");
        return Q.race([promise1, promise2]).then((value) => {
            expect(value).toBe("second");
        });
    });
});