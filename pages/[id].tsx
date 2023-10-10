import GameTable from "../components/gameTable/gameTable";

interface LoadedGameProps {
    params: {
        id: number
    }
}

export default function Id({ params }: LoadedGameProps) {
    return (
        <GameTable id={params.id} />
    )
}
