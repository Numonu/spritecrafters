import { useState, useEffect } from "react";
import { ArtDataTypes } from "../../../../global/constants/types";
import { useParams } from "react-router-dom";
import Repeat from "../../../../global/components/atoms/Repeat";
import ArtCardSoul from "../../../gallery/components/molecules/ArtCardSoul";
import ArtCard from "../../../gallery/components/organisms/ArtCard";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../../lib/firebase.config";

export default function AllWork() {
	const { uid } = useParams();

	const [arts, setArts] = useState<ArtDataTypes[] | null>(null);

	//Obtenemos los trabajos del usuario (max:4)
	useEffect(() => {
		const q = query(
			collection(db, "gallery"),
			where("uid", "==", uid),
            orderBy("timestamp" ,"desc"),
			limit(8)
		);
		getDocs(q).then((snapshot) => {
			const result: ArtDataTypes[] = [];
			snapshot.forEach((e) => {
				result.push(e.data() as ArtDataTypes);
			});
			setArts(result);
		});
	}, [uid]);

	//Durante la carga
	if (!arts) {
		return (
			<section>
				<h2 className="mb-4 capitalize text-xl">all work</h2>
				<div className="grid grid-cols-1 gap-6 min-[360px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
					<Repeat repeat={10}>
						<ArtCardSoul />
					</Repeat>
				</div>
			</section>
		);
	}
	//Si el usuario NO tiene publicaciones
	if (!arts.length)
		return (
			<h2 className="text-neutral-400 text-center capitalize">
				this user still has nothing to show...
			</h2>
		);
	//Si el usuario SI tiene publicaciones
	return (
		<section>
			<h2 className="mb-4 capitalize text-xl">all work</h2>
			<div className="grid grid-cols-1 gap-6 min-[360px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{arts.map((e: ArtDataTypes) => (
					<ArtCard data={e} />
				))}
			</div>
		</section>
	);
}