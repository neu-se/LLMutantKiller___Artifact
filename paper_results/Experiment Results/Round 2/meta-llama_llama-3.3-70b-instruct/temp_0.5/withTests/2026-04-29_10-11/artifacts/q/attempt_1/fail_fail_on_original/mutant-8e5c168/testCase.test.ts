import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q function with promise", () => {
    it("should resolve the promise", () => {
        const promise = Q((resolve, reject) => {
            resolve("Hello, World!");
        });

        return promise.then((value) => {
            expect(value).toBe("Hello, World!");
        });
    });
});