import {describe, expect, test} from '@jest/globals';
import {boardStringify} from '../utils/gameUtils';

function createEmptyTestBoard(size: number): {board:number[][], boardString: string} {
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
    for(let i = 3; i <= 7; i++) {
        const {board, boardString} = createEmptyTestBoard(i);

        test(`Test empty ${i}x${i} board stringify function`, () => {
            expect(boardStringify(board, i)).toBe(boardString);
        });
    }
});