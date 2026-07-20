import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should set property correctly", () => {
        const obj = {};
        const promise = Q.fulfill(obj);
        const result = promise.dispatch("set", ["test", "value"]);
        return result.then(() => {
            expect(obj.test).toBe("value");
        });
    });
});