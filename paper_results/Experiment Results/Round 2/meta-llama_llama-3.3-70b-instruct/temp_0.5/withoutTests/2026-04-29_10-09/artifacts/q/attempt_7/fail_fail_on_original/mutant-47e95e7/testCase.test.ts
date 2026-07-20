import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should return the promise value when the state is 'fulfilled'", () => {
        const promise = Q.resolve("Test resolution");
        const inspected = promise.inspect();
        expect(inspected.state).toBe("fulfilled");
        expect(promise.valueOf()).not.toBe(promise);
    });
});