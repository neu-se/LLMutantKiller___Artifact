import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should dispatch delete operation with the correct key', () => {
        const object = { dispatch: jest.fn() };
        Q(object).del('foo');
        expect(object.dispatch).toHaveBeenCalledWith('delete', ['foo']);
    });

    it('should not dispatch delete operation with an empty array', () => {
        const object = { dispatch: jest.fn() };
        Q(object).del('foo');
        expect(object.dispatch).not.toHaveBeenCalledWith('delete', []);
    });
});