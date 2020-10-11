import { useState, useEffect } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from "@capacitor/core";

const PHOTO_STORAGE = "photos";

export function usePhotoGallery() {

	const [photos, setPhotos] = useState<Photo[]>([]);
	const { getPhoto } = useCamera();
	const { deleteFile, readFile, writeFile } = useFilesystem();
	const { get, set } = useStorage();
	// We load all photos already available in IndexedDB to state in the case of web.This runs only once when array is passed with it.DOUBT
	useEffect(() => {
		const loadSaved = async () => {
			const photosString = await get(PHOTO_STORAGE);
			const photosInStorage = (photosString ? JSON.parse(photosString) : []) as Photo[];
			// If running on the web...
			if (!isPlatform('hybrid')) {
				for (let photo of photosInStorage) {
					const file = await readFile({
						path: photo.filepath,
						directory: FilesystemDirectory.Data
					});
					// Web platform only: Save the photo into the base64 field
					photo.base64 = `data:image/jpeg;base64,${file.data}`;
				}
			}
			setPhotos(photosInStorage);
		};
		loadSaved();
	}, [get, readFile]);

//  takePhoto begins
	const takePhoto = async () =>
	 {
	 			// take the photo
				const cameraPhoto = await getPhoto({
					resultType: CameraResultType.Uri,
					source: CameraSource.Camera,
					quality: 100
				});

			// create a fileName
			const fileName = new Date().getTime() + '.jpeg';
			// save the image
			// result contains "filename and location of the image"
			const savedFileImage = await savePicture(cameraPhoto, fileName);
			// Add "filename and location of the image"
			const newPhotos = [savedFileImage, ...photos];
			// write "filename and location of the image" to state (means we write to RAM.. Not to disk yet)
			setPhotos(newPhotos);
			// Now we write to disk
			set(PHOTO_STORAGE,
				isPlatform('hybrid')? JSON.stringify(newPhotos): JSON.stringify(newPhotos.map(p => {
					// Incase of web,we write the raw image to disk using IndexedDB.It is loaded to state to be used by loadSaved().It is stored in base64 variable in state and read while pic loads.We only store the metadata to local.
						const photoCopy = { ...p };
						console.log("base64 ");
						console.log(photoCopy.base64);
						delete photoCopy.base64;
						return photoCopy;
					}
					)));

	};
	// takePhoto ends ^
	// Above we take photo,write the file to disk using savePicture,write metadata to state,write metadata to disk as JSON with name "photos"
	
	// save pic begins  ↓
	const savePicture = async (photo: CameraPhoto, fileName: string): Promise<Photo> => 
	{
			let base64Data: string;
			// If Android or iOS
			if (isPlatform('hybrid')) 
			{
				// Read the file from phone storage possibly.
				const file = await readFile(
					{
					path: photo.path!
					}
				);
				// store the blob to ...
				base64Data = file.data;
			}
			// if web
			else 
			{
				// copy the blob if its web
				base64Data = await base64FromPath(photo.webPath!);
			}
			// above we have read the binary data given from camera..
			// below we write that data to storage.In web,it gets stored to IndexedDB

			const savedFile = await writeFile(
			{
				path: fileName,
				data: base64Data,
				directory: FilesystemDirectory.Data
			}
			);
			// After storing the file,we get it's absolute path.
			if (isPlatform('hybrid'))
			 {
				// We return fileName and location of the file
				return {
									// Do what should be done
									filepath: savedFile.uri,
									// Get from localStorage
									webviewPath: Capacitor.convertFileSrc(savedFile.uri),
							};
			}
			else 
			{
				// console.log("We")
				// We return fileName and location of the file
				return {
									filepath: fileName,
									// IDK where its stored.It doesn't matter though.
									// Still we read from webPath only since in web,storing the file to storage is not clear.
									webviewPath: photo.webPath
							};
			}
	};
	//above,we return fileName and location of the file
	// savePicture ends ^

	const deletePhoto = async (photo: Photo) => 
	{
		const newPhotos = photos.filter(p => p.filepath !== photo.filepath);
		set(PHOTO_STORAGE, JSON.stringify(newPhotos));
		const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
		await deleteFile({
			path: filename,
			directory: FilesystemDirectory.Data
		});
		setPhotos(newPhotos);
	};
	// deletePhoto ends

	return {
		deletePhoto,
		photos,
		takePhoto
	};
}
// Main ends

export interface Photo {
	filepath: string;
	webviewPath?: string;
	base64?: string;
}

