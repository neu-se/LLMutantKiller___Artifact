import { Q } from "./q";

describe('Q', () => {
    it('should call the nextTick function with the correct arguments', () => {
        // Arrange
        const nextTickSpy = jest.fn();
        const q = Q();

        // Act
        q.nextTick(nextTickSpy);

        // Assert
        expect(nextTickSpy).toHaveBeenCalledTimes(1);
    });
});