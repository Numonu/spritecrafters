import { ReactNode, useReducer, useState } from "react";
import { Tool } from "../enums/drawTools";
import { snapshotReduce } from "../reducers/snapshotReduce";
import { drawContext } from "../context/drawContext";
import { RECENT_COLORS_LENGTH } from "../constants/drawConstants";

type DrawProviderTypes = {
	children: ReactNode;
};
export type SnapshotTypes = {
	list: ImageData[];
	listFocus: number;
};

export default function DrawProvider({ children }: DrawProviderTypes) {
	//the current color for brush tool
	const [currentColor , setCurrentColor] = useState("#262626");

	//list of recently used colors
	const [colorHistory , setColorHistory] = useState(new Array(RECENT_COLORS_LENGTH).fill(null));

	//the current active tool
	const [currentTool, setCurrentTool] = useState(Tool.Brush);

	//the size of the grid
	const [size , setSize] = useState(16);

	//list of the snpashots generated by each action
	const [snapshot, dispatch] = useReducer(snapshotReduce, {
		list: [],
		listFocus: 0,
	});

	const addSnapshot = (imageData: ImageData) => {
		dispatch({
			type: "add",
			value: imageData,
		});
	};

	const previusSnapshot = () => {
		dispatch({
			type: "previus",
		});
	};
	const advanceSnapshot = () => {
		dispatch({
			type: "advance",
		});
	};

	const addColorToHistory = (newColor : string) => {
		if(newColor === colorHistory[0]) return;
		const NEW_LIST = [newColor,...colorHistory , ];
		if(NEW_LIST.length > RECENT_COLORS_LENGTH)NEW_LIST.pop();
		setColorHistory(NEW_LIST);
	}

	return (
		<drawContext.Provider
			value={{
				tool: {
					current: currentTool,
					update: setCurrentTool,
				},
				snapshot: {
					current: snapshot.list[snapshot.listFocus],
					add: addSnapshot,
					previus: previusSnapshot,
					advance: advanceSnapshot,
				},
				color : {
					current : currentColor,
					history : colorHistory,
					add : addColorToHistory,
					update : setCurrentColor
				},
				grid : {
					size,
					update : setSize
				}
			}}
		>
			{children}
		</drawContext.Provider>
	);
}