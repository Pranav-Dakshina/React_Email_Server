import React from 'react';
import ImagesUploader from 'react-images-uploader';
// import 'react-images-uploader/styles.css';
// import 'react-images-uploader/font.css';

export default class ImgUploader extends React.Component {
	render() {
		return (
			<ImagesUploader
				url="http://localhost:8080/chgDp"
				optimisticPreviews
				multiple={false}
				onLoadEnd={(error) => {
					if (error) {
						console.error(error);
					}
				}}
				label="Upload a picture"
				/>
		);
	}
}
