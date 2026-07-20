import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call fcall with the provided arguments", () => {
        const promise = Q((a: number, b: number, c: number) => a + b + c);
        return promise.fcall(1, 2, 3).then((result: number) => {
            expect(result).toBe(6);
        });
    });
});