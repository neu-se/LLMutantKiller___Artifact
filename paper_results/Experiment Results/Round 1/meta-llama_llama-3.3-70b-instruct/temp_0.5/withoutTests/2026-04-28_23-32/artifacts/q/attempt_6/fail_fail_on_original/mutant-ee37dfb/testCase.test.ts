import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should call dispatch when post is called", () => {
        const promise = Q();
        const dispatchSpy = jest.spyOn(promise, "dispatch");
        promise.post("test", ["arg1", "arg2"]);
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith("post", ["test", ["arg1", "arg2"]]);
        dispatchSpy.mockRestore();
    });
});