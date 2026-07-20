import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should set property correctly", () => {
        const obj = {};
        const promise = Q.fulfill(obj);
        return promise.then((value) => {
            const result = Q(value).dispatch("set", ["test", "value"]);
            return result.then(() => {
                expect(value.test).toBeUndefined();
            });
        });
    });
});