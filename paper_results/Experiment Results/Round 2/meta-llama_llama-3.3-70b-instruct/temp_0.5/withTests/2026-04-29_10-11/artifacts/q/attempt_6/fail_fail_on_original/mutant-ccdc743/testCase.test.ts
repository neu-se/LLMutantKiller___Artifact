import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call finally callback when it is a function", () => {
        let called = false;
        Q("value").finally(() => {
            called = true;
        });
        expect(called).toBe(true);
    });
});