import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import {
  updateStart, updateSuccess, updateFailure,
  deleteUserStart, deleteUserSuccess, deleteUserFailure,
  signoutSuccess,
} from '../../redux/user/userSlice';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState(null);
  const [updateErrorMessage, setUpdateErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  // Handle image file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  // Upload image whenever a new file is selected
  useEffect(() => {
    if (imageFile) uploadImage();
  }, [imageFile]);

  const uploadImage = async () => {
    setIsUploading(true);
    setUploadError(null);

    const storage = getStorage(app);
    const storageRef = ref(storage, `${new Date().getTime()}_${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setUploadError('Could not upload image (File must be less than 2MB)');
        resetImageUploadState();
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData({ ...formData, profilePicture: downloadURL });
        resetImageUploadState();
      }
    );
  };

  const resetImageUploadState = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
    setIsUploading(false);
  };

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Submit profile updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) return setUpdateErrorMessage('No changes made');
    if (isUploading) return setUpdateErrorMessage('Please wait for image to upload');

    try {
      dispatch(updateStart());
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        dispatch(updateFailure(data.message));
        setUpdateErrorMessage(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateSuccessMessage("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateErrorMessage(error.message);
    }
  };

  // Delete user account
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // Sign out user
  const handleSignout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/signout`, {
        method: 'POST',
        credentials: "include",
      });

      if (response.ok) dispatch(signoutSuccess());
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {uploadProgress && (
            <CircularProgressbar
              value={uploadProgress}
              text={`${uploadProgress}%`}
              strokeWidth={5}
            />
          )}
          <img
            src={imagePreviewUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${uploadProgress && uploadProgress < 100 && 'opacity-60'}`}
          />
        </div>
        {uploadError && <Alert color='failure'>{uploadError}</Alert>}
        <TextInput type='text' id='username' placeholder='Name' defaultValue={currentUser.name} onChange={handleChange} />
        <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type='password' id='password' placeholder='Password' onChange={handleChange} />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline disabled={loading || isUploading}>
          {loading ? 'Loading...' : 'Update'}
        </Button>
        {currentUser.isAdmin && (
          <>
            <Link to='/create-product'>
              <Button type='button' gradientDuoTone='purpleToPink'>Create a product</Button>
            </Link>
            <Link to='/dashboard?tab=categories'>
              <Button type='button' gradientDuoTone='purpleToPink'>Create a category</Button>
            </Link>
          </>
        )}
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='cursor-pointer'>Sign Out</span>
      </div>
      {updateSuccessMessage && <Alert color='success' className='mt-5'>{updateSuccessMessage}</Alert>}
      {updateErrorMessage && <Alert color='failure' className='mt-5'>{updateErrorMessage}</Alert>}
      {error && <Alert color='failure' className='mt-5'>{error}</Alert>}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>Yes, I'm sure</Button>
              <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
