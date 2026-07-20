import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the fcall method correctly", () => {
        const promise = Q.resolve();
        const result = promise.fcall(function() {});
        expect(result).toBeUndefined();
    });
});