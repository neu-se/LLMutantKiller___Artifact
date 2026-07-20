import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.del mutation test", () => {
    it("should dispatch 'delete' operation with correct operation name", async () => {
        const obj = { a: 10 };
        const promise = Q(obj).del("a");
        const dispatchSpy = jest.spyOn(promise, 'dispatch');
        await promise;
        expect(dispatchSpy).toHaveBeenCalledWith("delete", ["a"]);
    });
});