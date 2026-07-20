import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.delete", () => {
    it("should not call the dispatch method with an empty string as the operation name", () => {
        const dispatchSpy = jest.fn();
        const obj = { dispatch: dispatchSpy };
        Q(obj).delete("foo");
        expect(dispatchSpy).not.toHaveBeenCalledWith('', ["foo"]);
    });
});