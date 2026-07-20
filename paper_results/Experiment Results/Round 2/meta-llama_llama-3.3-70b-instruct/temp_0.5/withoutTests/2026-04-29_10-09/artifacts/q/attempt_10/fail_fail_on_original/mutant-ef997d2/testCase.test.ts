import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should call the fallback function when Q.master is called with an object and a fallback function", () => {
        const object = { foo: "bar" };
        const fallback = jest.fn(function (op: string, args: any[]) {
            return Q(object);
        });
        Q.master(object, fallback);
        expect(fallback).toHaveBeenCalledTimes(1);
    });
});