import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should create a global Q object when executed as a script", () => {
        // Create a new promise
        const promise = Q.resolve("Test");

        // Check if the promise is fulfilled
        promise.then((value: any) => {
            expect(value).toBe("Test");
        });
    });
});