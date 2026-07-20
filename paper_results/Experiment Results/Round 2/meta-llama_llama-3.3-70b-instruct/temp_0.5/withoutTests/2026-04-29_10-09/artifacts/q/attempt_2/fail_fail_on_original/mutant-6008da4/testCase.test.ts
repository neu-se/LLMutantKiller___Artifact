import { Q } from "../../../../../q.js";

describe('Q', () => {
    it('should use process.nextTick when isNodeJS is true', () => {
        // Arrange
        const originalProcess = global.process;
        global.process = { nextTick: jest.fn() };

        // Act
        Q.nextTick(() => {});

        // Assert
        expect(global.process.nextTick).toHaveBeenCalledTimes(1);

        // Clean up
        global.process = originalProcess;
    });

    it('should use setTimeout when isNodeJS is false', () => {
        // Arrange
        const originalProcess = global.process;
        delete global.process;

        // Act
        Q.nextTick(() => {});

        // Assert
        expect(setTimeout).toHaveBeenCalledTimes(1);

        // Clean up
        global.process = originalProcess;
    });
});