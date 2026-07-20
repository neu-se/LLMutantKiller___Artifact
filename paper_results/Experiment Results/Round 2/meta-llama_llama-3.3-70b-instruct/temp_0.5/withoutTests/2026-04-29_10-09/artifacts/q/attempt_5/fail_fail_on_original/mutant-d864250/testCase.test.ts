import { Q } from "../../../q.js";

describe("Q", () => {
    it("should set property correctly", () => {
        const obj = {};
        const promise = Q.fulfill(obj);
        return promise.then((value: any) => {
            Q(value).dispatch("set", ["test", "value"]);
            return Q(value).dispatch("get", ["test"]).then((result: any) => {
                expect(value["test"]).toBeUndefined();
            });
        });
    });
});