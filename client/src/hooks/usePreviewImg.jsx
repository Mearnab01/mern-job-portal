import { useState } from "react";
import toast from "react-hot-toast";

const usePreviewImg = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const imagePreviewUrl = URL.createObjectURL(file);
      setImageUrl(imagePreviewUrl);
    } else {
      toast.error("Invalid file type. Please select an image file.");
      setImageUrl(null);
    }
  };

  return { handleImageChange, imageUrl, setImageUrl };
};

export default usePreviewImg;
