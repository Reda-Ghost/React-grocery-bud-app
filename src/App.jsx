import React, { useEffect, useRef, useState } from 'react';
import List from './List';
import Alert from './Alert';

const getSessionStorage = () => {
	let list = sessionStorage.getItem('list');
	if (list) {
		return JSON.parse(list);
	} else {
		return [];
	}
};

function App() {
	const [name, setName] = useState('');
	const [list, setList] = useState(getSessionStorage());
	const [isEditing, setIsEditing] = useState(false);
	const [editID, setEditID] = useState(null);
	const [alert, setAlert] = useState({
		show: false,
		msg: '',
		type: '',
	});

	const inputRef = useRef();

	const handelSubmit = (e) => {
		e.preventDefault();

		if (!name) {
			// if user submit without data
			showAlert(true, 'please enter your message!', 'danger');
		} else if (name && isEditing) {
			// if user edit the data

			setList(
				list.map((item) => {
					if (item.id === editID) {
						return { ...item, title: name };
					}
					return item;
				})
			);
			setName('');
			setEditID(null);
			setIsEditing(false);
			showAlert(true, 'value changed', 'success');
		} else {
			// add the data in list
			showAlert(true, 'item added to the list', 'success');

			const newItem = {
				id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
				title: name,
			};
			setList([...list, newItem]);
			setName('');
		}
	};

	const removeItem = (id) => {
		showAlert(true, 'item removed', 'danger');
		setList(list.filter((item) => id !== item.id));
	};
	const clearList = () => {
		showAlert(true, 'empty list', 'danger');
		setList([]);
	};

	const editItem = (id) => {
		const specificItem = list.find((item) => item.id === id);
		setIsEditing(true);
		setEditID(id);
		setName(specificItem.title);
		inputRef.current.focus();
	};

	const showAlert = (show = false, msg = '', type = '') => {
		setAlert({ show, msg, type });
	};

	useEffect(() => {
		sessionStorage.setItem('list', JSON.stringify(list));
	}, [list]);

	return (
		<section className="section-center">
			<form className="grocery-form" onSubmit={handelSubmit}>
				{alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
				<h3>grocery bud</h3>
				<div className="form-control">
					<input
						type="text"
						className="grocery"
						placeholder="e.g. eggs"
						value={name}
						onChange={(e) => setName(e.target.value)}
						ref={inputRef}
					/>
					<button type="submit" className="submit-btn">
						{isEditing ? 'edit' : 'submit'}
					</button>
				</div>
			</form>
			{list.length > 0 && (
				<div className="grocery-container">
					<List items={list} removeItem={removeItem} editItem={editItem} />
					<button className="clear-btn" onClick={clearList}>
						Cleat all
					</button>
				</div>
			)}
		</section>
	);
}

export default App;
