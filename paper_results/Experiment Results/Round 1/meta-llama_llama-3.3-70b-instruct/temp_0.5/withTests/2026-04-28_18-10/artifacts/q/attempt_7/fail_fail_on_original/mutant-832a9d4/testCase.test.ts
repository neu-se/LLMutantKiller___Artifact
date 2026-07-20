import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect the mutation in the nextTick function", () => {
        const nextTick = Q.nextTick;
        nextTick(() => {});
        expect(nextTick).not.toHaveBeenCalledWith(() => {});
    });
});