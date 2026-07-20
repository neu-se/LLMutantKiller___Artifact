import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should resolve a promise in a Node.js environment", (done) => {
        if (typeof process === "object" && process.toString() === "[object process]") {
            const promise = Q.resolve("test");
            promise.then((value) => {
                expect(value).toBe("test");
                done();
            });
        } else {
            done();
        }
    });
});