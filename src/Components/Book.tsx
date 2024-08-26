import { useState } from "react";
import "./Book.css";
import Button from "./Button.tsx";

//Same BookInterface as in App.tsx and AddBook.tsx
interface BookInterface {
	title: string;
	author: string;
	isbn: number;
	genres?: Array<string>;
	rating: number;
	cover?: string;
}

function Book({ book, updateBook, removeBook }: { book: BookInterface; updateBook: (updatedBook: BookInterface) => void; removeBook: (book: BookInterface) => void }) {
	// states/attributes for each book
	const [edit, setEdit] = useState<boolean>(false);
	const [title, setTitle] = useState<string>(book.title);
	const [author, setAuthor] = useState<string>(book.author);
	const [isbn] = useState<number>(book.isbn);
	const [rating, setRating] = useState<number>(book.rating);
	// score is stored as an array of stars:
	// (score==4 -> [⭐,⭐,⭐,⭐])
	let stars = [];
	for (let i = 0; i < book.rating; i++) {
		stars.push(<span key={i}>⭐</span>);
	}
	// saves changes done to book being edited:
	const handleEdit = () => {
		const updatedBook: BookInterface = {
			title: title,
			author: author,
			isbn: isbn,
			genres: book.genres,
			rating: rating,
			cover: book.cover,
		};
		// updates book with updateBook (same ass updateBookList in App.tsx)
		updateBook(updatedBook);
		// set edit to false to close edit view
		setEdit(false);
	};

	const handleRemove = () => {
		removeBook(book);
	};

	return (
		<article className="book-container">
			{/* "if editing, display the first DOM section...:" */}
			{edit ? (
				<>
					<section className="book-info">
						<figure style={{ backgroundImage: `url(${book.cover})` }}></figure>
						{/* Here, the values of the title and authors are changed depending on the input */}
						<input defaultValue={title} onChange={(e) => setTitle(e.target.value)} id="newTitle" />
						<input defaultValue={author} onChange={(e) => setAuthor(e.target.value)} id="newAuthor" />
						<p>{book.isbn}</p>
						<p>Genres: {book.genres ? book.genres.join(", ") : "Not defined"}</p>
						<input max="5" min="1" type="number" defaultValue={rating} onChange={(e) => setRating(parseInt(e.target.value))} id="newRating" />
					</section>

					{/* original confirm button: 
					<button className="button-grey" onClick={handleEdit}>
						Confirm
					</button> */}

					{/* custom confirm button: */}
					<Button label={"Confirm"} onclickAction={handleEdit} buttonClass="button-grey" />
				</>
			) : (
				<>
					{/* "...else, display this alternate DOM section...:" */}
					<section className="book-info">
						<figure style={{ backgroundImage: `url(${book.cover})` }}></figure>
						<h2>{book.title}</h2>
						<p>{book.author}</p>
						<p>{book.isbn}</p>
						<p>Genres: {book.genres ? book.genres.join(", ") : "Not defined"}</p>
						<p>{stars}</p>
					</section>

					{/* original edit button: 
                    <button
						className="button-grey"
						onClick={() => {
							setEdit(true); // this toggles edit mode (replacing this DOM section with the above one)
						}}
					>
						Edit
					</button> */}

					{/* original remove button: 
					<button className="button-grey" onClick={handleRemove}>
						Remove
					</button> */}

					{/* custom edit & remove buttons: */}

					<Button label={"Edit"} onclickAction={() => setEdit(true)} buttonClass="button-grey" />
					<Button label={"Remove"} onclickAction={handleRemove} buttonClass="button-grey" />
				</>
			)}
		</article>
	);
}
export default Book; // If edit is false the DOM shows one variation of the Book container with classname "book container". If true its shows
