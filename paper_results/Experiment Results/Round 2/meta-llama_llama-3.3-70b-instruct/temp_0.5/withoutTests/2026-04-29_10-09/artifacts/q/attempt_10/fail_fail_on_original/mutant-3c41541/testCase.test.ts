import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.delete", () => {
    it("should call dispatch with 'delete' when delete is called", () => {
        const obj = {
            dispatch: jest.fn(),
            delete: jest.fn(() => {
                obj.dispatch('delete', ['foo']);
            })
        };
        Q(obj).delete("foo");
        expect(obj.dispatch).toHaveBeenCalledTimes(1);
        expect(obj.dispatch).toHaveBeenCalledWith('delete', ['foo']);
    });
});