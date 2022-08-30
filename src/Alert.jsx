import React, { useEffect } from 'react';

function Alert({ type, msg, removeAlert , list }) {
	useEffect(() => {
		const timerAlert = setTimeout(() => {
			removeAlert();
		}, 3000);
		return () => clearTimeout(timerAlert);
	}, [list , removeAlert]);

	return <p className={`alert alert-${type}`}>{msg}</p>;
}

export default Alert;
