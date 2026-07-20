import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any function", () => {
    it("should resolve with the first fulfilled promise", () => {
        const promise1 = Q.delay(100).then(() => "First");
        const promise2 = Q.delay(50).then(() => "Second");
        const promise3 = Q.reject("Error");

        return Q.any([promise1, promise2, promise3]).then((result) => {
            expect(result).toBe("Second");
        });
    });
});