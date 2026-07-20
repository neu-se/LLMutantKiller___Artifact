import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call fcall with correct arguments", async () => {
        const func = jest.fn();
        q.fcall(func, 1, 2, 3);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith(1, 2, 3);
    });
});