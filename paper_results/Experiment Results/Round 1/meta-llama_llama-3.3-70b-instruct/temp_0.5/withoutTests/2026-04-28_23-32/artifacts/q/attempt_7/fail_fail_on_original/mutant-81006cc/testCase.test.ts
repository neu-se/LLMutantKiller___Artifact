import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q post method", () => {
    it("should dispatch with the correct operation name", () => {
        const object = {
            dispatch: (op, args) => {
                if (op !== "post") {
                    throw new Error("Incorrect operation name");
                }
                return "success";
            },
        };
        const name = "test";
        const args = ["arg1", "arg2"];
        const result = Q.post(object, name, args);
        expect(result).toBe("success");
    });
});