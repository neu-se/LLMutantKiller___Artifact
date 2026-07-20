import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should throw an error when dispatch is not called by post", () => {
        const promise = Q();
        jest.spyOn(promise, "dispatch");
        const originalPost = promise.post;
        promise.post = function () { };
        expect(() => promise.post("test", ["arg1", "arg2"])).not.toThrowError();
        expect(promise.dispatch).not.toHaveBeenCalled();
        promise.post = originalPost;
        expect(() => promise.post("test", ["arg1", "arg2"])).toThrowError();
    });
});