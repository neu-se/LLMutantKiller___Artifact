import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should dispatch delete correctly", async () => {
        const obj = { foo: "bar", delete: jest.fn() };
        const promise = Q(obj);
        await promise["delete"]("foo");
        expect(obj.delete).toHaveBeenCalledTimes(1);
        expect(obj.delete).toHaveBeenCalledWith("foo");
    });
});