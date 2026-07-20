import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.allSettled", () => {
    it("should throw an error when no function is provided in the array_map callback", async () => {
        const promises = [Q.resolve(1), Q.resolve(2), Q.reject("error")];
        await expect(Q.allSettled(promises)).rejects.toThrow();
    });
});