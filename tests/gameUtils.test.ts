import {describe, expect, test} from '@jest/globals';
import {
    boardStringify,
    createEmptyTable,
    createTableSizesArray, getWinner,
    parseTableData,
    transposedArray
} from '../utils/gameUtils';

function createEmptyTestBoard(size: number): { board: number[][], boardString: string } {
    const tableData: number[][] = [];
    let boardString = "";

    for (let i = 0; i < size; i++) {
        const row: number[] = []
        for (let j = 0; j < size; j++) {
            row.push(0)
            boardString += "0";
        }
        tableData.push(row)
    }

    return {
        board: tableData,
        boardString: boardString
    };
}

describe('gameUtils module', () => {
    // createTableSizesArray
    test(`Test create table sizes array function without parameters`, () => {
        expect(createTableSizesArray()).toEqual([3, 4, 5, 6, 7]);
    });
    test(`Test create table sizes array function with (3, 7) parameters`, () => {
        expect(createTableSizesArray(3, 7)).toEqual([3, 4, 5, 6, 7]);
    });
    test(`Test create table sizes array function with (3, 3) parameters`, () => {
        expect(createTableSizesArray(3, 3)).toEqual([3]);
    });

    // createEmptyTable
    for (let i = 3; i <= 7; i++) {
        const {board} = createEmptyTestBoard(i);

        test(`Test create empty ${i}x${i} board function`, () => {
            expect(createEmptyTable(i)).toEqual(board);
        });
    }

    // parseTableData tests
    for (let i = 3; i <= 7; i++) {
        const {board, boardString} = createEmptyTestBoard(i);

        test(`Test empty ${i}x${i} board parse function`, () => {
            expect(parseTableData(boardString)).toEqual({
                table: board,
                size: i,
                currentPlayer: 1
            });
        });
    }

    // boardStringify tests
    for (let i = 3; i <= 7; i++) {
        const {board, boardString} = createEmptyTestBoard(i);

        test(`Test empty ${i}x${i} board stringify function`, () => {
            expect(boardStringify(board, i)).toBe(boardString);
        });
    }

    // transposedArray
    test(`Test transposedArray function on 3x3 board`, () => {
        expect(transposedArray([
            [1,2,0],
            [0,1,0],
            [0,0,0],
        ])).toEqual([
            [1,0,0],
            [2,1,0],
            [0,0,0],
        ]);
    });
    test(`Test transposedArray function on 7x7 board`, () => {
        expect(transposedArray([
            [1,2,0,0,0,0,0],
            [0,1,0,0,0,0,0],
            [0,0,0,2,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
        ])).toEqual([
            [1,0,0,0,0,0,0],
            [2,1,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,2,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
        ]);
    });

    // getWinner
    test(`Test getWinner function on 3x3 board with no winner`, () => {
        expect(getWinner([
            [1,2,0],
            [0,1,0],
            [0,0,0],
        ], 3)).toBe(0);
    });
    test(`Test getWinner function on 3x3 board with x winner`, () => {
        expect(getWinner([
            [1,2,0],
            [2,1,0],
            [0,0,1],
        ], 3)).toBe(1);
    });
    test(`Test getWinner function on 3x3 board with x winner`, () => {
        expect(getWinner([
            [0,2,1],
            [0,1,0],
            [1,2,0],
        ], 3)).toBe(1);
    });
    test(`Test getWinner function on 3x3 board with x winner`, () => {
        expect(getWinner([
            [1,1,1],
            [2,2,0],
            [0,0,0],
        ], 3)).toBe(1);
    });
    test(`Test getWinner function on 3x3 board with x winner`, () => {
        expect(getWinner([
            [2,2,0],
            [1,1,1],
            [0,0,0],
        ], 3)).toBe(1);
    });
    test(`Test getWinner function on 3x3 board with x winner`, () => {
        expect(getWinner([
            [2,2,0],
            [0,0,0],
            [1,1,1],
        ], 3)).toBe(1);
    });
    test(`Test getWinner function on 3x3 board with O winner`, () => {
        expect(getWinner([
            [2,1,0],
            [1,2,0],
            [0,1,2],
        ], 3)).toBe(2);
    });
    test(`Test getWinner function on 3x3 board with O winner`, () => {
        expect(getWinner([
            [0,1,2],
            [1,2,0],
            [2,1,0],
        ], 3)).toBe(2);
    });
    test(`Test getWinner function on 3x3 board with O winner`, () => {
        expect(getWinner([
            [2,2,2],
            [1,1,0],
            [0,0,1],
        ], 3)).toBe(2);
    });
    test(`Test getWinner function on 3x3 board with O winner`, () => {
        expect(getWinner([
            [1,1,0],
            [2,2,2],
            [0,0,1],
        ], 3)).toBe(2);
    });
    test(`Test getWinner function on 3x3 board with O winner`, () => {
        expect(getWinner([
            [1,1,0],
            [0,0,1],
            [2,2,2],
        ], 3)).toBe(2);
    });
    test(`Test getWinner function on 3x3 board with draw result`, () => {
        expect(getWinner([
            [1,2,1],
            [2,1,1],
            [2,1,2],
        ], 3)).toBe(3);
    });
    test(`Test getWinner function on 7x7 board with x winner`, () => {
        expect(getWinner([
            [1,0,2,0,0,0,0],
            [0,1,0,0,0,0,0],
            [0,0,1,2,0,0,0],
            [0,0,0,1,0,2,0],
            [0,2,0,0,1,0,0],
            [0,0,2,0,0,1,0],
            [0,0,0,0,2,0,1],
        ], 3)).toBe(1);
    });
    test(`Test getWinner function on 7x7 board with x winner`, () => {
        expect(getWinner([
            [1,1,1,1,1,1,1],
            [0,2,0,0,0,0,0],
            [0,0,2,0,2,0,0],
            [0,0,0,0,2,0,0],
            [0,0,0,0,2,0,0],
            [0,0,0,0,2,0,0],
            [0,0,0,0,0,0,0],
        ], 3)).toBe(1);
    });
});