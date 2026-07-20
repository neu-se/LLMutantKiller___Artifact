import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.delete", () => {
    it("should call the dispatch method with 'delete' as the operation name", () => {
        const dispatchSpy = jest.fn();
        const obj = { dispatch: dispatchSpy };
        Q(obj).delete("foo");
        expect(dispatchSpy).toHaveBeenCalledWith('delete', ["foo"]);
    });
});