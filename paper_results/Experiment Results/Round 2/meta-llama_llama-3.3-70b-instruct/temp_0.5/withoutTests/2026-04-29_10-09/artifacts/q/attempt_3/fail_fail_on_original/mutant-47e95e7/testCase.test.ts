import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should return the promise value when the inspected state is 'fulfilled'", () => {
        const promise = Q.resolve("Test resolution");
        const inspected = promise.inspect();
        expect(promise.valueOf()).toBe("Test resolution");
    });
});