import { useState } from "react";
import { PiSealWarningBold } from "react-icons/pi";

type InputTypes = {
	placeholder: string;
	required? : boolean;
	error?: string;
	type?: string;
	value?: string;
	onChange: (value: string) => void;
};

export default function Input({
	placeholder,
	error,
	onChange,
	value,
	type = "text",
	required = true,
}: InputTypes) {
	const [focus, setFocus] = useState(false);

	const on = () => setFocus(true);
	const off = () => setFocus(false);

	return (
		<div>
			<label
				className={`text-neutral-700 mb-1 pb-1 px-2 flex gap-4 border-b transition-colors ${
					focus && "border-primary"
				}`}
				onFocus={on}
				onBlur={off}
				htmlFor={placeholder + "_"}
			>
				<span
					className={`capitalize transition-colors ${
						focus && "text-primary"
					}`}
				>
					{placeholder}
				</span>git 
				<input
					className="text-title min-w-0 grow outline-none text-base"
					type={type}
					value={value}
					required={required}
					id={placeholder + "_"}
					onChange={(e) => onChange(e.target.value)}
				/>
			</label>
			<span
				className={`text-red-500 flex gap-1 items-center lowercase ${
					!error && "opacity-0"
				}`}
			>
				<span className="text-lg">
					<PiSealWarningBold />
				</span>
				<span className="text-sm">{error}</span>
			</span>
		</div>
	);
}
