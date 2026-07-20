import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay function", () => {
    it("should delay the resolution of a promise", () => {
        const promise = Q.delay(Promise.resolve("test"), 100);
        const thenSpy = jest.fn();
        promise.then(thenSpy);
        expect(thenSpy).not.toHaveBeenCalled();
        jest.runAllTimers();
        expect(thenSpy).toHaveBeenCalledTimes(1);
    });
});