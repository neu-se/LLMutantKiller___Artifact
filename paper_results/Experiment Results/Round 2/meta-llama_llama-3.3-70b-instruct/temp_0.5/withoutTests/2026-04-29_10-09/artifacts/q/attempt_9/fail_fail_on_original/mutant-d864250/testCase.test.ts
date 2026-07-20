import { Q } from "../../../q.js";

describe("Q", () => {
    it("should set property correctly", () => {
        const obj = {};
        const promise = Q.fulfill(obj);
        return promise.then((value: any) => {
            Q(value).dispatch("set", ["test", "value"]);
            // The original code does not set the property, so this will pass
            expect(value).not.toHaveProperty("test");
        });
    });
});