import { Q } from "../../../q.js";

describe("Q.get", () => {
    it("should return a promise that resolves with the value of the given key", () => {
        const object = { a: 1 };
        return Q(object).get("a").then((value: any) => {
            expect(value).toBe(1);
        });
    });

    it("should reject if the key is not present in the object", () => {
        const object = { a: 1 };
        return Q(object).get("b").then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error).toBeInstanceOf(Error);
        });
    });

    it("should call Q(object).dispatch with 'get' as the operation", () => {
        const object = { a: 1 };
        const dispatchSpy = jest.spyOn(Q(object), 'dispatch');
        Q(object).get("a");
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith('get', ["a"]);
    });
});