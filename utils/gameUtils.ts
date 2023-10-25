type ParsedGameType = {
    table: number[][],
    size: number,
    currentPlayer: number
}

export function createTableSizesArray(start = 3, end = 7): number[] {
    const result: number[] = [];

    for (let i = start; i <= end; i++) {
        result.push(i);
    }

    return result;
}

export function createEmptyTable(size: number): number[][] {
    const tableData: number[][] = []

    for (let i = 0; i < size; i++) {
        const row: number[] = []
        for (let j = 0; j < size; j++) {
            row.push(0)
        }
        tableData.push(row)
    }

    return tableData;
}

export function parseTableData(board: string): ParsedGameType {
    const data = {
        table: [],
        size: 3,
        currentPlayer: 1
    } as ParsedGameType;

    data.size = Math.sqrt(board.length);

    const array: number[][] = [];
    const firstPlayer: number = Array.from(board).filter(cell => cell === "1").length;
    const secondPlayer: number = Array.from(board).filter(cell => cell === "2").length;

    for (let i = 0; i < data.size; i++) {
        const row: number[] = [];
        for (let j = 0; j < data.size; j++) {
            row.push(Number(board[i * data.size + j]));
        }
        array.push(row);
    }

    data.table = array;

    data.currentPlayer = firstPlayer > secondPlayer ? 2 : 1;

    return data;
}

export function boardStringify(board: number[][], size: number): string {
    let string = "";

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            string += board[i][j];
        }
    }

    return string;
}

export function transposedArray(board: number[][]) {
    return board[0].map((_, colIndex) => board.map(row => row[colIndex]));
}

export function getWinner(board: number[][], size: number): number {
    // row
    for (let i = 0; i < size; i++) {
        if (board[i].every(cell => cell === 1)) {
            return 1;
        }
        if (board[i].every(cell => cell === 2)) {
            return 2;
        }
    }

    // col
    const tBoard = transposedArray(board);

    for (let i = 0; i < size; i++) {
        if (tBoard[i].every(cell => cell === 1)) {
            return 1;
        }
        if (tBoard[i].every(cell => cell === 2)) {
            return 2;
        }
    }

    let diff = false;
    for (let i = 1; i < size; i++) {
        if (board[i][i] !== board[0][0]) {
            diff = true;
        }
    }
    if (!diff) {
        return board[0][0];
    }

    diff = false;
    for (let i = 0; i < size; i++) {
        if (board[i][size - i - 1] !== board[0][size - 1]) {
            diff = true;
        }
    }
    if (!diff) {
        return board[0][size - 1];
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === 0) {
                return 0
            }
        }
    }

    return 3;
}
