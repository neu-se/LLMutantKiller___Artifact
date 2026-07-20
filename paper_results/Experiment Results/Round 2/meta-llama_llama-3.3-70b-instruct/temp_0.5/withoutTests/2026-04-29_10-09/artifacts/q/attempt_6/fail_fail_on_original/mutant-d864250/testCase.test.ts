import { Q } from "../../../q.js";

describe("Q", () => {
    it("should set property correctly", () => {
        const obj = {};
        const promise = Q.fulfill(obj);
        return promise.then((value: any) => {
            Q(value).dispatch("set", ["test", "value"]);
            expect(value["test"]).toBe("value");
        });
    });
});