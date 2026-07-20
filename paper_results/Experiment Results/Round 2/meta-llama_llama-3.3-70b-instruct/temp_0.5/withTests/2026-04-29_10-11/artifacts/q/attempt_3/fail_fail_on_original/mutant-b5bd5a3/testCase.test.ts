import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should handle thenable objects", () => {
        const thenable = {
            then: (resolve, reject) => {
                resolve("resolved");
            }
        };

        const promise = Q(thenable);
        expect(promise.inspect().state).toBe("pending");

        return promise.then((value) => {
            expect(value).toBe("resolved");
        });
    });
});