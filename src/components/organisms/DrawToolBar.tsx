import { HiOutlinePaintBrush } from "react-icons/hi2";
import { BsEraser } from "react-icons/bs";
import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";
import { MdInvertColors } from "react-icons/md";
import { BsNut , BsCloudUpload , BsDownload} from "react-icons/bs";
import ToolButton from "../atoms/ToolCall";
import { Tool } from "../../global/enums/drawTools";
import {PiPaintBucket} from "react-icons/pi"
import ToolTip from "../atoms/ToolTip";
import { useContext } from "react";
import { drawContext } from "../../global/context/drawContext";
import { requireDependencies } from "../../global/utilities/errorHandlers";
import RemoteAction from "../atoms/RemoteAction";
import ToolSetter from "../molecules/ToolSetter";

export default function PaintToolBar() {
	requireDependencies(drawContext);
	const draw = useContext(drawContext);
	return (
		<aside className="flex flex-wrap justify-center flex-row gap-6 lg:flex-col lg:justify-start">
			<div className="border-neutral-300 p-1 rounded-md border flex lg:flex-col gap-2">
				<ToolTip tip="Brush" keycode="q">
					<ToolSetter toolValue={Tool.Brush}>
						<HiOutlinePaintBrush />
						<RemoteAction keycode="q"/>
					</ToolSetter>
				</ToolTip>
				<ToolTip tip="Picker" keycode="w">
					<ToolSetter toolValue={Tool.Picker}>
						<MdInvertColors />
						<RemoteAction keycode="w"/>
					</ToolSetter>
				</ToolTip>
				<ToolTip tip="Eraser" keycode="e">
					<ToolSetter toolValue={Tool.Eraser}>
						<BsEraser />
						<RemoteAction keycode="e"/>
					</ToolSetter>
				</ToolTip>
				<ToolTip tip="Bucket" keycode="r">
					<ToolSetter toolValue={Tool.Bucket}>
						<PiPaintBucket />
						<RemoteAction keycode="r"/>
					</ToolSetter>
				</ToolTip>
			</div>
			<div className="border-neutral-300 p-1 rounded-md border flex lg:flex-col gap-2">
				<ToolTip tip="Revert" keycode="z">
					<ToolButton callback={draw!.snapshot.previus}>
						<TfiBackLeft />
						<RemoteAction keycode="z"/>
					</ToolButton>
				</ToolTip>

				<ToolTip tip="Advance" keycode="x">
					<ToolButton callback={draw!.snapshot.advance}>
						<TfiBackRight />
						<RemoteAction keycode="x"/>
					</ToolButton>
				</ToolTip>
			</div>
			<div className="border-neutral-300 p-1 rounded-md border flex lg:flex-col gap-2">
				<ToolTip tip="Config" keycode="c">
					<ToolButton>
						<BsNut />
						<RemoteAction keycode="c"/>
					</ToolButton>
				</ToolTip>
				<ToolTip tip="Download" keycode="d">
					<ToolButton>
						<BsDownload />
						<RemoteAction keycode="d"/>
					</ToolButton>
				</ToolTip>
				<ToolTip tip="Upload" keycode="u">
					<ToolButton>
						<BsCloudUpload/>
						<RemoteAction keycode="u"/>
					</ToolButton>
				</ToolTip>
			</div>
		</aside>
	);
}
