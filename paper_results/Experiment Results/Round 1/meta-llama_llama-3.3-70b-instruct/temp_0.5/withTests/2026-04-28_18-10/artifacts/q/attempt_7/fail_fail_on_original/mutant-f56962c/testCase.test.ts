import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call fcall with correct arguments", async () => {
        const func = jest.fn();
        const result = q.fcall(func, 1, 2, 3);
        expect(result).toBeInstanceOf(q.Promise);
    });
});