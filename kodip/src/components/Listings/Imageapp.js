import React, {useState} from 'react';
import styles from './Imageapp.module.css';
import Modal from 'react-modal';

function Imageapp ({selected}) {

	const [selectedImage, setSelectedImage] = useState(null);


	function openImage (selected) {
		setSelectedImage(selected);

	}

const closeModal = () => {
	setSelectedImage(null);
};








	return (

<div className = {styles.Imageapp}>


    <div className={styles.Modalimages}>
        <img src={selected} alt={selected.title} className={styles.imagepop1} 

        onClick = {() => openImage(selected)}

        />
        <h4 className={styles.text}>Click for full-size image </h4>


        <div className={styles.imagepopgroup}>
        <img src={selected} alt={selected.title} className={styles.imagepop2} onClick = {() => openImage(selected)}/>
        <img src={selected} alt={selected.title} className={styles.imagepop2} />
        <img src={selected} alt={selected.title} className={styles.imagepop2} />
        <img src={selected} alt={selected.title} className={styles.imagepop2} />
        <img src={selected} alt={selected.title} className={styles.imagepop2} />
        <img src={selected} alt={selected.title} className={styles.imagepop2} />
        <img src={selected} alt={selected.title} className={styles.imagepop2} />
        <img src={selected} alt={selected.title} className={styles.imagepop2} />
        <img src={selected} alt={selected.title} className={styles.imagepop2} />
        <img src={selected} alt={selected.title} className={styles.imagepop2} />
        <img src={selected} alt={selected.title} className={styles.imagepop2} />
        <img src={selected} alt={selected.title} className={styles.imagepop2} />
        <img src={selected} alt={selected.title} className={styles.imagepop2} />
        <img src={selected} alt={selected.title} className={styles.imagepop2} />
        <img src={selected} alt={selected.title} className={styles.imagepop2} />
        <img src={selected} alt={selected.title} className={styles.imagepop2} />
   </div>

   <Modal
    isOpen = {selectedImage !==null}
    onRequestClose = {closeModal}
    contentLabel = "image Modal"
    className= {styles.selectimageModal}
    >
    <img src={selected} alt={selected.title} className={styles.selectmodal}/>
    <button className={styles.closeselected} onClick= {closeModal}> Close </button> 

    </Modal>
    </div>


</div>
		)};

export default Imageapp;