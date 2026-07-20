import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call get with the correct key", () => {
        const obj = { a: 1, b: 2 };
        const promise = Q(obj);
        return Q.all([promise.get("a"), promise.get("b")]).then((values: any[]) => {
            expect(values).toEqual([1, 2]);
        });
    });
});