"use client";
import React, { useRef, useState } from "react";
import styles from "./ImagePicker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name }) => {

  const [pickedImage, setPickedImage] = useState();
  const imageInputRef = useRef();

  const handleClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="picked image"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </div>
        <input
          className={styles.input} // input not visible
          type="file"
          id={name}
          accept="image/png, image/jpg"
          name={name}
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
        <button type="button" className={styles.button} onClick={handleClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
