import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call get with the correct key", () => {
        const obj = { a: 1 };
        const promise = Q(obj);
        return promise.get("a").then((value: any) => {
            expect(value).toBe(1);
            const anotherPromise = Q(obj);
            return anotherPromise.get("a").then((anotherValue: any) => {
                expect(anotherValue).toBe(1);
            });
        });
    });
});