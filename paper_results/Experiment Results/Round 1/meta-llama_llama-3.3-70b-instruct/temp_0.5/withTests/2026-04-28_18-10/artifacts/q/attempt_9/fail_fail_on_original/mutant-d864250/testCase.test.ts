import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should set property on an object", () => {
        const obj: any = {};
        const promise = Q(obj).set("test", "value");
        return promise.then(() => {
            expect(Object.keys(obj).length).toBe(1);
            expect(obj.test).toBe("value");
        });
    });
});