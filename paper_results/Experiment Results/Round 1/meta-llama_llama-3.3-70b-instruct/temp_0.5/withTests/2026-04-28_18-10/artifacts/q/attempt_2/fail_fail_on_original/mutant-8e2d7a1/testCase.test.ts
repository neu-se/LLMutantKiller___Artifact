import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
    it("should set a property on an object", () => {
        const obj = {};
        const promise = Q(obj).set("test", "value");
        return promise.then(() => {
            expect(obj.test).toBe("value");
        });
    });
});