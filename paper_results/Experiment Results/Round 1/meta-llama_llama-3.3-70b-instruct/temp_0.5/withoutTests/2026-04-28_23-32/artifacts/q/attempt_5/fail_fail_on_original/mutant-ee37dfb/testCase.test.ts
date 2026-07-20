import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should throw an error when post does not call dispatch", () => {
        const promise = Q();
        const originalPost = promise.post;
        promise.post = function () { };
        expect(() => {
            const dispatchSpy = jest.spyOn(promise, "dispatch");
            promise.post("test", ["arg1", "arg2"]);
            expect(dispatchSpy).not.toHaveBeenCalled();
        }).toThrowError();
        promise.post = originalPost;
    });
});