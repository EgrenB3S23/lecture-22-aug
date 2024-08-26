import { ReactElement, useState } from "react";
import "./Button.css";

function Button({ label, onclickAction, buttonClass }: { label: string; onclickAction: () => void; buttonClass?: string }): ReactElement {
	return (
		<>
			<button onClick={onclickAction} className={`${buttonClass}`}>
				{label}
			</button>
		</>
	);
}

export default Button;
