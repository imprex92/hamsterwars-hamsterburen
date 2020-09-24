import React, { useState } from "react";
import "./UploadForm.css";
import GenericBtn from "./GenericBtn";

const UploadForm = ({ hamster }) => {
	const [name, setName] = useState("");
	const [age, setAge] = useState(Number());
	const [favFood, setfavFood] = useState("");
	const [loves, setLoves] = useState("");
	const [nameTouched, setNameTouched] = useState(false);
	const [ageTouched, setAgeTouched] = useState(false);
	const [favFoodTouched, setFavFoodTouched] = useState(false);
	const [lovesTouched, setLovesTouched] = useState(false);
	// const [broadcastMsg, setBroadcastMsg] = useState("");
	const [imgName, setImgName] = useState({});
	const maxSize = 3000000;
	// const addImg = (e) => {
	// 	let impFile = e.target.files;
	// 	console.log(impFile);
	// 	for(let file of impFile){
	// 		if(file.size > 3000000){
	// 			console.log('size too large');
	// 			impFile = undefined
	// 			console.log(impFile);
	// 		} else{
	// 			let fileReader = new FileReader();

	// 			fileReader.onload = function(event) {
	// 				let imgData = event.target.result;
	// 				console.log(imgData);
	// 				setImgName(imgData)
	// 				console.log(imgName + 'this is the image');
	// 			}
	// 			fileReader.readAsDataURL(file)

	// 		}
	// 	}
	// }

	const addImg = (e) => {
		let impFile = e.target.files;
		for (let file of impFile) {
			if (file.size > maxSize && file.type === "image/*") {
				console.log("File too large, max 3MB, choese another one");
				impFile = undefined;
				//TODO add message that file is not accepted
			} else {
				console.log("File accepted");
				setImgName(file); //Bilden läggs här
				//TODO add message that file is accepted
			}
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (
			!name.trim("") ||
			!age.trim("") ||
			!favFood.trim("") ||
			!loves.trim("") ||
			name.length > 15 ||
			favFood.length > 15 ||
			loves.length > 40 ||
			Number.isInteger(age) ||
			age < 0
		) {
			console.log("inside if");
			// setBroadcastMsg(
			// 	"You made a misstake filling in the fields! Luckily you can easily fix this by following the instructions given"
			// );
		} else {
			hamster = {
				name: name,
				age: age,
				favFood: favFood,
				loves: loves,
				imgName: imgName,
			};
			console.log("inside else");
			let imgFormData = new FormData();
			imgFormData.append("imgName", imgName); //! imgName är variabeln vi angett i server.js (app.post upload.single(...HÄR...))

			let request1 = fetch("/api/upload/", {
				method: "post",
				body: imgFormData,
			});
			let request2 = fetch("/api/upload/", {
				method: "post",
				body: hamster,
			});

			Promise.all([request1, request2])
				.then((requests) => {
					requests.forEach((request) => {
						process(request.json());
					});
				})
				.catch((err) => {});
			let process = (promise) => {
				promise.then((data) => {
					console.log(data);
				}); //Promise needs to waite untill it's resolved
			};
			console.log(imgName);
		}
	};

	return (
		<>
			<form method="POST" encType="multipart/form-data">
				<h2>Make your own hamster...</h2>
				<div className="inputs">
					<label style={{ position: "relative" }} htmlFor="formName">
						Name:
						<div className="name-error-message">
							<span
								style={
									!name.trim("") && nameTouched
										? { display: "block", color: "red" }
										: { display: "none" }
								}
							>
								Field Required
							</span>
							<span
								style={
									name.length > 15 && nameTouched
										? { display: "block", color: "orange" }
										: { display: "none" }
								}
							>
								{" "}
								max 15 chars
							</span>
						</div>
					</label>

					<input
						id="formName"
						type="text"
						onChange={(e) => setName(e.target.value)}
						onBlur={() => setNameTouched(true)}
					/>

					<label style={{ position: "relative" }} htmlFor="formAge">
						Age:
						<div className="age-error-message">
							<span
								style={
									!age && ageTouched
										? { display: "block", color: "red" }
										: { display: "none" }
								}
							>
								Field Required
							</span>
							<span
								style={
									(age < 0 ||
										age > 99 ||
										(Number.isInteger(age) && age)) &&
									ageTouched
										? { display: "block", color: "red" }
										: { display: "none" }
								}
							>
								0 - 99
							</span>
						</div>
					</label>

					<input
						type="number"
						id="formAge"
						onChange={(e) => setAge(e.target.value)}
						onBlur={() => setAgeTouched(true)}
					/>

					<label style={{ position: "relative" }} htmlFor="formFood">
						Favourite food:
						<div className="favFood-error-message">
							<span
								style={
									!favFood.trim("") && favFoodTouched
										? { display: "block", color: "red" }
										: { display: "none" }
								}
							>
								Field Required
							</span>
							<span
								style={
									favFood.length > 15 && favFoodTouched
										? { display: "block", color: "orange" }
										: { display: "none" }
								}
							>
								max 15 chars
							</span>
						</div>
					</label>

					<input
						type="text"
						id="formFood"
						onChange={(e) => setfavFood(e.target.value)}
						onBlur={() => setFavFoodTouched(true)}
					/>

					<label style={{ position: "relative" }} htmlFor="formLoves">
						Loves:
						<div className="loves-error-massage">
							<span
								style={
									!loves.trim("") && lovesTouched
										? { display: "block", color: "red" }
										: { display: "none" }
								}
							>
								Field Required
							</span>
							<span
								style={
									loves.length > 40 && lovesTouched
										? { display: "block", color: "orange" }
										: { display: "none" }
								}
							>
								max 40 chars
							</span>
						</div>
					</label>

					<input
						type="text"
						id="formLoves"
						onChange={(e) => setLoves(e.target.value)}
						onBlur={() => setLovesTouched(true)}
					/>
				</div>

				<label htmlFor="hamsterImage" className="hamsterImage">
					Press to upload image
				</label>
				<input
					accept="image/*"
					type="file"
					name="hamsterImage"
					id="hamsterImage"
					onChange={(e) => addImg(e)}
				/>

				<div className="errorsection"></div>

				<div className="genericBtn-form" onClick={(e) => onSubmit(e)}>
					<GenericBtn page={"result"} text={"add"} color={"peach"} />
				</div>
			</form>
		</>
	);
};
export default UploadForm;
