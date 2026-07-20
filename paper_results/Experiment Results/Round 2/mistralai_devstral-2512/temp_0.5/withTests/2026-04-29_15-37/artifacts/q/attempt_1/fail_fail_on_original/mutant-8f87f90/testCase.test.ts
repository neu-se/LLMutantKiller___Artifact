import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.post behavior", () => {
    it("should correctly invoke method with arguments when name is not null or undefined", async () => {
        const obj = {
            method: function(arg1: number, arg2: number) {
                return this.value + arg1 + arg2;
            },
            value: 10
        };

        const result = await Q.post(obj, "method", [2, 3]);
        expect(result).toBe(15);
    });
});