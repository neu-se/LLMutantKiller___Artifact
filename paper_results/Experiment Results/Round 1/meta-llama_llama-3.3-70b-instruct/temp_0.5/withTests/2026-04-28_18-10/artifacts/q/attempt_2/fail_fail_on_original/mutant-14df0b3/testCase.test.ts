import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete", () => {
    it("should call the dispatch function with 'delete' operation", () => {
        const obj = { a: 1, b: 2 };
        const dispatchSpy = jest.spyOn(Q(obj), 'dispatch');
        Q(obj).delete("a");
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith("delete", ["a"]);
    });
});