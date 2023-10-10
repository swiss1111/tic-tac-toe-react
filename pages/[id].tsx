import GameTable from "../components/gameTable/gameTable";
import {useRouter} from "next/router";

export default function Id() {
    const router = useRouter();
    const params = router?.query;
    const id = parseInt(params?.id as string);

    return (
        <GameTable id={id} />
    )
}
