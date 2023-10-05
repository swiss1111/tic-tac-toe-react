const baseUrl = "http://localhost:5000";

type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

async function fetchData(url = "", data: any = undefined, method: MethodType = "GET", additionalOptions: RequestInit = {}) {
    let response;

    const options: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        ...additionalOptions,
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        response = await fetch(baseUrl + url, options)
    } catch (error) {
        console.log('There was an error', error);
    }

    if (response?.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}

export function opponentMove(player: 1 | 2, board: string): Promise<any> {
    return fetchData('/opponent-move', {
        player,
        board,
    });
}

export function getGames(): Promise<any> {
    return fetchData('/boards');
}

export function saveGame(tableString: string, name: string): Promise<any> {
    return fetchData('/boards', {
        board: tableString,
        name
    }, "POST");
}

export function getGame(id: number): Promise<any> {
    return fetchData(`/boards/${id}`);
}

export function modifyGame(id: number, tableString: string, name: string): Promise<any> {
    return fetchData(`/boards/${id}`, {
        board: tableString,
        name
    }, "PATCH");
}

export function deleteGame(id: number): Promise<any> {
    return fetchData(`/boards/${id}`, undefined, "DELETE");
}