import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should throw an error when post is called without dispatch", () => {
        const promise = Q();
        const originalDispatch = promise.dispatch;
        promise.dispatch = undefined;
        expect(() => promise.post("test", ["arg1", "arg2"])).toThrowError();
        promise.dispatch = originalDispatch;
    });
});