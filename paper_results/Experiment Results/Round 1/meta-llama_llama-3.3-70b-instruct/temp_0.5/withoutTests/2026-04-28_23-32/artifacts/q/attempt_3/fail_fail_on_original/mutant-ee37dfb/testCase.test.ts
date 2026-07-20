import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should call dispatch when post is called and dispatch is defined", () => {
        const promise = Q();
        const dispatchSpy = jest.spyOn(promise, "dispatch");
        promise.post("test", ["arg1", "arg2"]);
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith("post", ["test", ["arg1", "arg2"]]);
    });

    it("should not throw an error when post is called and dispatch is not defined in the mutated code", () => {
        const promise = Q();
        promise.post = function (name, args) { };
        expect(() => promise.post("test", ["arg1", "arg2"])).not.toThrowError();
    });
});