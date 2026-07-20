import { Promise } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call the finally callback when the promise is fulfilled", () => {
        let called = false;
        return Promise.resolve("foo")
            .finally(() => {
                called = true;
            })
            .then(() => {
                expect(called).toBe(true);
            });
    });
});