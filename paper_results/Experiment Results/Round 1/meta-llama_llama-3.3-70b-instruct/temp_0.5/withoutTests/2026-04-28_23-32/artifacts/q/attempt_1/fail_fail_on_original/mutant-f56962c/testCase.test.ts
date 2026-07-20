import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the fcall method correctly", () => {
        const promise = Q.resolve();
        const spy = jest.fn();
        promise.fcall(spy);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});