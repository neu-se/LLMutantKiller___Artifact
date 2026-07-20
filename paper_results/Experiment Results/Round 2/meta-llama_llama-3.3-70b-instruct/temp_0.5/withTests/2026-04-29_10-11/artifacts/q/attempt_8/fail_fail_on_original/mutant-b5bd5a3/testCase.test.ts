import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should handle promise resolution with a thenable object", () => {
        const thenable = {
            then: (resolve: (value: any) => void, reject: (reason: any) => void) => {
                resolve("resolved");
            }
        };
        const promise = Q(thenable);
        return promise.then((value: any) => {
            expect(value).toBe("resolved");
        });
    });
});